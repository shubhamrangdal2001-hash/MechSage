"""Model definitions and training helpers for RUL regression."""

import os
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from lightgbm import LGBMRegressor
from catboost import CatBoostRegressor
from src.evaluate import compute_rul_metrics
from src.utils import get_project_root, set_seed, plot_rul_predictions


# ─────────────────────────────────────────────────────────────────────────────
# PYTORCH DEEP LEARNING MODEL DEFINITIONS
# ─────────────────────────────────────────────────────────────────────────────

class LSTMRegressor(nn.Module):
    """Stacked LSTM for RUL regression."""
    def __init__(self, input_size, hidden_size=128, num_layers=2, dropout=0.2):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers=num_layers,
                            batch_first=True, dropout=dropout)
        self.fc = nn.Linear(hidden_size, 1)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.dropout(out[:, -1, :])
        return self.fc(out).squeeze(-1)


class GRURegressor(nn.Module):
    """Stacked GRU for RUL regression."""
    def __init__(self, input_size, hidden_size=128, num_layers=2, dropout=0.2):
        super().__init__()
        self.gru = nn.GRU(input_size, hidden_size, num_layers=num_layers,
                          batch_first=True, dropout=dropout)
        self.fc = nn.Linear(hidden_size, 1)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        out, _ = self.gru(x)
        out = self.dropout(out[:, -1, :])
        return self.fc(out).squeeze(-1)


class CNNRegressor(nn.Module):
    """1D Convolutional Neural Network for RUL regression."""
    def __init__(self, input_size, num_filters=64, kernel_size=3, dropout=0.2):
        super().__init__()
        self.conv1 = nn.Conv1d(input_size, num_filters, kernel_size=kernel_size, padding=1)
        self.conv2 = nn.Conv1d(num_filters, num_filters * 2, kernel_size=kernel_size, padding=1)
        self.pool = nn.AdaptiveAvgPool1d(1)
        self.dropout = nn.Dropout(dropout)
        self.fc = nn.Linear(num_filters * 2, 1)
        self.relu = nn.ReLU()

    def forward(self, x):
        # x shape: (batch, seq_len, features) → conv expects (batch, features, seq_len)
        x = x.permute(0, 2, 1)
        x = self.relu(self.conv1(x))
        x = self.relu(self.conv2(x))
        x = self.pool(x).squeeze(-1)
        x = self.dropout(x)
        return self.fc(x).squeeze(-1)


class TransformerRegressor(nn.Module):
    """
    Lightweight Transformer Encoder for time-series RUL regression.
    Uses positional encoding + multi-head attention.
    """
    def __init__(self, input_size, d_model=64, nhead=4, num_layers=2, dropout=0.1):
        super().__init__()
        self.input_proj = nn.Linear(input_size, d_model)
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=nhead, dropout=dropout, batch_first=True
        )
        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        self.pool = nn.AdaptiveAvgPool1d(1)
        self.fc = nn.Linear(d_model, 1)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        x = self.input_proj(x)
        x = self.transformer(x)
        # Pool over time dimension: (batch, seq_len, d_model) → (batch, d_model)
        x = x.permute(0, 2, 1)
        x = self.pool(x).squeeze(-1)
        x = self.dropout(x)
        return self.fc(x).squeeze(-1)


# ─────────────────────────────────────────────────────────────────────────────
# SKLEARN ML MODEL TRAINING
# ─────────────────────────────────────────────────────────────────────────────

def train_sklearn_rul_models(X_train, y_train, X_test, y_test, seed=42, models=None):
    """
    Train scikit-learn / tree-based RUL regression models.

    Args:
        models: Optional list of model names to train. If None, trains all.
                Valid names: LinearRegression, RandomForest, XGBoost, LightGBM, CatBoost

    Returns:
        dict: { model_name: (trained_model, params_dict, metrics_dict, y_pred) }
    """
    set_seed(seed)
    all_models = {
        "LinearRegression": LinearRegression(),
        "RandomForest":     RandomForestRegressor(n_estimators=100, max_depth=10, random_state=seed, n_jobs=-1),
        "XGBoost":          XGBRegressor(n_estimators=200, learning_rate=0.05, max_depth=6,
                                         subsample=0.8, colsample_bytree=0.8,
                                         random_state=seed, n_jobs=-1, verbosity=0),
        "LightGBM":         LGBMRegressor(n_estimators=200, learning_rate=0.05, max_depth=6,
                                          subsample=0.8, colsample_bytree=0.8,
                                          random_state=seed, n_jobs=-1, verbose=-1),
        "CatBoost":         CatBoostRegressor(iterations=200, learning_rate=0.05, depth=6,
                                              random_seed=seed, verbose=0)
    }
    # Filter by requested model list
    selected = {k: v for k, v in all_models.items() if models is None or k in models}

    results = {}
    for name, model in selected.items():
        print(f"  Training {name}...")
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        metrics = compute_rul_metrics(y_test, y_pred)
        params = model.get_params() if hasattr(model, "get_params") else {}
        results[name] = (model, params, metrics, y_pred)
        print(f"    RMSE={metrics['RMSE']:.2f} | MAE={metrics['MAE']:.2f} | R²={metrics['R2']:.4f}")
    return results


# ─────────────────────────────────────────────────────────────────────────────
# PYTORCH DL MODEL TRAINING
# ─────────────────────────────────────────────────────────────────────────────

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


def train_pytorch_rul_model(
    model,
    X_train_seq, y_train_seq,
    X_test_seq, y_test_seq,
    model_name: str,
    epochs: int = 50,
    batch_size: int = 64,
    lr: float = 1e-3,
    seed: int = 42
):
    """
    Train a single PyTorch model for RUL regression.

    Returns:
        model, train_losses, val_losses, metrics_dict, y_pred_numpy
    """
    set_seed(seed)
    model = model.to(DEVICE)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    criterion = nn.MSELoss()
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=5, factor=0.5)

    # Build DataLoaders
    X_tr = torch.tensor(X_train_seq, dtype=torch.float32)
    y_tr = torch.tensor(y_train_seq, dtype=torch.float32)
    X_te = torch.tensor(X_test_seq, dtype=torch.float32)
    y_te = torch.tensor(y_test_seq, dtype=torch.float32)

    train_loader = DataLoader(TensorDataset(X_tr, y_tr), batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(TensorDataset(X_te, y_te), batch_size=batch_size, shuffle=False)

    train_losses, val_losses = [], []

    for epoch in range(1, epochs + 1):
        model.train()
        epoch_loss = 0.0
        for X_batch, y_batch in train_loader:
            X_batch, y_batch = X_batch.to(DEVICE), y_batch.to(DEVICE)
            optimizer.zero_grad()
            preds = model(X_batch)
            loss = criterion(preds, y_batch)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item() * len(y_batch)
        avg_train_loss = epoch_loss / len(y_tr)
        train_losses.append(avg_train_loss)

        # Validation pass
        model.eval()
        val_loss = 0.0
        with torch.no_grad():
            for X_batch, y_batch in test_loader:
                X_batch, y_batch = X_batch.to(DEVICE), y_batch.to(DEVICE)
                preds = model(X_batch)
                val_loss += criterion(preds, y_batch).item() * len(y_batch)
        avg_val_loss = val_loss / len(y_te)
        val_losses.append(avg_val_loss)
        scheduler.step(avg_val_loss)

        if epoch % 10 == 0:
            print(f"    [{model_name}] Epoch {epoch}/{epochs} | Train Loss: {avg_train_loss:.4f} | Val Loss: {avg_val_loss:.4f}")

    # Final evaluation
    model.eval()
    with torch.no_grad():
        y_pred = model(X_te.to(DEVICE)).cpu().numpy()
    metrics = compute_rul_metrics(y_test_seq, y_pred)
    print(f"    [{model_name}] RMSE={metrics['RMSE']:.2f} | MAE={metrics['MAE']:.2f} | R²={metrics['R2']:.4f}")
    return model, train_losses, val_losses, metrics, y_pred


def train_all_dl_rul_models(
    X_train_seq, y_train_seq,
    X_test_seq, y_test_seq,
    input_size: int,
    epochs: int = 50,
    batch_size: int = 64,
    lr: float = 1e-3,
    seed: int = 42,
    models: list = None,
):
    """
    Train deep learning RUL regressors (LSTM, GRU, CNN_1D, Transformer).

    Args:
        models: Optional list of model names to train. If None, trains all.
                Valid names: LSTM, GRU, CNN, Transformer

    Returns:
        dict: { model_name: (model, train_losses, val_losses, metrics, y_pred) }
    """
    all_dl_models = {
        "LSTM":        LSTMRegressor(input_size=input_size, hidden_size=128, num_layers=2),
        "GRU":         GRURegressor(input_size=input_size, hidden_size=128, num_layers=2),
        "CNN":         CNNRegressor(input_size=input_size, num_filters=64, kernel_size=3),
        "CNN_1D":      CNNRegressor(input_size=input_size, num_filters=64, kernel_size=3),
        "Transformer": TransformerRegressor(input_size=input_size, d_model=64, nhead=4, num_layers=2)
    }
    selected = {k: v for k, v in all_dl_models.items() if models is None or k in models}
    # Deduplicate (CNN and CNN_1D are the same model)
    seen, deduped = set(), {}
    for k, v in selected.items():
        canonical = "CNN_1D" if k == "CNN" else k
        if canonical not in seen:
            seen.add(canonical)
            deduped[canonical] = v

    results = {}
    for name, model in deduped.items():
        print(f"\n  Training {name}...")
        results[name] = train_pytorch_rul_model(
            model, X_train_seq, y_train_seq, X_test_seq, y_test_seq,
            model_name=name, epochs=epochs, batch_size=batch_size, lr=lr, seed=seed
        )
    return results
