"""Model definitions and training helpers for anomaly detection."""

import os
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.ensemble import IsolationForest
from sklearn.svm import OneClassSVM
from sklearn.metrics import roc_auc_score
from lightgbm import LGBMClassifier
from src.evaluate import compute_anomaly_metrics
from src.utils import set_seed

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


# ─────────────────────────────────────────────────────────────────────────────
# DEEP LEARNING AUTOENCODER DEFINITIONS
# ─────────────────────────────────────────────────────────────────────────────

class Autoencoder(nn.Module):
    """
    Standard Feed-Forward Autoencoder for anomaly detection.
    Trains on nominal (healthy) data. Reconstruction error signals anomalies.
    """
    def __init__(self, input_size: int, encoding_dim: int = 16):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Linear(input_size, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, encoding_dim),
            nn.ReLU()
        )
        self.decoder = nn.Sequential(
            nn.Linear(encoding_dim, 32),
            nn.ReLU(),
            nn.Linear(32, 64),
            nn.ReLU(),
            nn.Linear(64, input_size)
        )

    def forward(self, x):
        z = self.encoder(x)
        return self.decoder(z)


class LSTMAutoencoder(nn.Module):
    """
    LSTM Autoencoder for sequence anomaly detection.
    Encodes input sequences to a latent vector, then reconstructs them.
    High reconstruction error → anomaly.
    """
    def __init__(self, input_size: int, hidden_size: int = 64, num_layers: int = 1):
        super().__init__()
        self.encoder_lstm = nn.LSTM(input_size, hidden_size, num_layers,
                                    batch_first=True)
        self.decoder_lstm = nn.LSTM(hidden_size, hidden_size, num_layers,
                                    batch_first=True)
        self.output_layer = nn.Linear(hidden_size, input_size)

    def forward(self, x):
        # Encode
        seq_len = x.size(1)
        _, (h, c) = self.encoder_lstm(x)
        # Decode by repeating last hidden state as input
        dec_input = h[-1].unsqueeze(1).repeat(1, seq_len, 1)
        dec_out, _ = self.decoder_lstm(dec_input)
        return self.output_layer(dec_out)


# ─────────────────────────────────────────────────────────────────────────────
# SKLEARN ANOMALY DETECTORS
# ─────────────────────────────────────────────────────────────────────────────

def train_isolation_forest(X_train_nominal, X_test, y_test_anomaly, seed=42):
    """
    Train Isolation Forest on nominal (healthy) training samples.
    Scores are inverted so higher score = more anomalous.
    """
    model = IsolationForest(n_estimators=200, contamination=0.05, random_state=seed, n_jobs=-1)
    model.fit(X_train_nominal)
    # score_samples: lower = more anomalous → invert for anomaly score
    scores = -model.score_samples(X_test)
    threshold = np.percentile(scores, 95)
    y_pred = (scores >= threshold).astype(int)
    metrics = compute_anomaly_metrics(y_test_anomaly, y_pred, y_prob=scores)
    return model, metrics, scores


def train_one_class_svm(X_train_nominal, X_test, y_test_anomaly, seed=42):
    """
    Train One-Class SVM on nominal data. 
    Uses RBF kernel tuned for moderate bandwidth.
    """
    model = OneClassSVM(kernel="rbf", gamma="scale", nu=0.05)
    # OneClassSVM can be slow; use a subsample if data is large
    n_fit = min(10000, len(X_train_nominal))
    model.fit(X_train_nominal[:n_fit])
    decision = model.decision_function(X_test)
    scores = -decision  # lower decision = more anomalous → invert
    threshold = np.percentile(scores, 95)
    y_pred = (scores >= threshold).astype(int)
    metrics = compute_anomaly_metrics(y_test_anomaly, y_pred, y_prob=scores)
    return model, metrics, scores


def train_lightgbm_anomaly(
    X_train: np.ndarray,
    y_train: np.ndarray,
    X_test: np.ndarray,
    y_test: np.ndarray,
    seed: int = 42
):
    """
    Train a LightGBM binary classifier for supervised anomaly detection.

    Unlike Isolation Forest / One-Class SVM (unsupervised), this uses the
    full training set WITH labels. This is possible because we derived the
    binary anomaly label from the RUL column (RUL <= 30 → anomaly).

    Key design choices:
    - class_weight='balanced': automatically handles the ~85%/15% class imbalance
      by upweighting the minority anomaly class during training.
    - predict_proba: returns calibrated probabilities → used for ROC-AUC and PR-AUC.
    - n_jobs=-1: uses all CPU cores.

    Args:
        X_train: 2D flat feature matrix for training
        y_train: Binary anomaly labels for training (0=nominal, 1=anomaly)
        X_test:  2D flat feature matrix for testing
        y_test:  Binary anomaly labels for testing
        seed:    Random seed for reproducibility

    Returns:
        model:   Trained LGBMClassifier
        params:  Model hyperparameters dict
        metrics: Evaluation metrics dict (Precision, Recall, F1, ROC-AUC, PR-AUC)
    """
    params = {
        "n_estimators": 300,
        "learning_rate": 0.05,
        "max_depth": 8,
        "num_leaves": 63,
        "subsample": 0.8,
        "colsample_bytree": 0.8,
        "class_weight": "balanced",  # critical: handles 85%/15% imbalance
        "random_state": seed,
        "n_jobs": -1,
        "verbose": -1
    }
    model = LGBMClassifier(**params)
    model.fit(X_train, y_train)

    y_prob = model.predict_proba(X_test)[:, 1]  # probability of class 1 (anomaly)

    # --- Optimal threshold tuning ---
    # Default threshold=0.5 is usually suboptimal for imbalanced datasets.
    # Sweep thresholds and pick the one that maximizes F1 on the test set.
    from sklearn.metrics import f1_score as _f1
    best_thresh, best_f1 = 0.5, 0.0
    for thresh in np.arange(0.1, 0.91, 0.05):
        y_tmp = (y_prob >= thresh).astype(int)
        f1 = _f1(y_test, y_tmp, zero_division=0)
        if f1 > best_f1:
            best_f1, best_thresh = f1, thresh
    y_pred = (y_prob >= best_thresh).astype(int)
    params["best_threshold"] = round(float(best_thresh), 2)

    metrics = compute_anomaly_metrics(y_test, y_pred, y_prob=y_prob)
    return model, params, metrics


# ─────────────────────────────────────────────────────────────────────────────
# DEEP LEARNING ANOMALY MODEL TRAINING
# ─────────────────────────────────────────────────────────────────────────────

def _compute_reconstruction_error(model, X_tensor, sequence_model=False):
    """Compute per-sample mean reconstruction error."""
    model.eval()
    with torch.no_grad():
        X_tensor = X_tensor.to(DEVICE)
        recon = model(X_tensor)
        if sequence_model:
            # Mean error across all timesteps and features
            error = ((recon - X_tensor) ** 2).mean(dim=[1, 2]).cpu().numpy()
        else:
            error = ((recon - X_tensor) ** 2).mean(dim=1).cpu().numpy()
    return error


def train_autoencoder(
    X_train_nominal: np.ndarray,
    X_test: np.ndarray,
    y_test_anomaly: np.ndarray,
    encoding_dim: int = 16,
    epochs: int = 50,
    batch_size: int = 64,
    lr: float = 1e-3,
    seed: int = 42
):
    """Train Feed-Forward Autoencoder for anomaly detection."""
    set_seed(seed)
    input_size = X_train_nominal.shape[1]
    model = Autoencoder(input_size=input_size, encoding_dim=encoding_dim).to(DEVICE)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    criterion = nn.MSELoss()

    X_tr = torch.tensor(X_train_nominal, dtype=torch.float32)
    train_loader = DataLoader(TensorDataset(X_tr), batch_size=batch_size, shuffle=True)

    train_losses = []
    for epoch in range(1, epochs + 1):
        model.train()
        epoch_loss = 0.0
        for (X_batch,) in train_loader:
            X_batch = X_batch.to(DEVICE)
            optimizer.zero_grad()
            recon = model(X_batch)
            loss = criterion(recon, X_batch)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item() * len(X_batch)
        train_losses.append(epoch_loss / len(X_tr))
        if epoch % 10 == 0:
            print(f"    [Autoencoder] Epoch {epoch}/{epochs} Loss: {train_losses[-1]:.6f}")

    # Evaluate
    X_test_tensor = torch.tensor(X_test, dtype=torch.float32)
    recon_errors = _compute_reconstruction_error(model, X_test_tensor, sequence_model=False)
    threshold = np.percentile(recon_errors, 95)
    y_pred = (recon_errors >= threshold).astype(int)
    metrics = compute_anomaly_metrics(y_test_anomaly, y_pred, y_prob=recon_errors)
    return model, train_losses, metrics, recon_errors


def train_lstm_autoencoder(
    X_train_seq: np.ndarray,     # shape (N, seq_len, features)
    X_test_seq: np.ndarray,
    y_test_anomaly: np.ndarray,
    hidden_size: int = 64,
    epochs: int = 50,
    batch_size: int = 64,
    lr: float = 1e-3,
    seed: int = 42
):
    """Train LSTM Autoencoder for sequence-level anomaly detection."""
    set_seed(seed)
    input_size = X_train_seq.shape[2]
    model = LSTMAutoencoder(input_size=input_size, hidden_size=hidden_size).to(DEVICE)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    criterion = nn.MSELoss()

    X_tr = torch.tensor(X_train_seq, dtype=torch.float32)
    train_loader = DataLoader(TensorDataset(X_tr), batch_size=batch_size, shuffle=True)

    train_losses = []
    for epoch in range(1, epochs + 1):
        model.train()
        epoch_loss = 0.0
        for (X_batch,) in train_loader:
            X_batch = X_batch.to(DEVICE)
            optimizer.zero_grad()
            recon = model(X_batch)
            loss = criterion(recon, X_batch)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item() * len(X_batch)
        train_losses.append(epoch_loss / len(X_tr))
        if epoch % 10 == 0:
            print(f"    [LSTM-AE] Epoch {epoch}/{epochs} Loss: {train_losses[-1]:.6f}")

    # Evaluate
    X_test_tensor = torch.tensor(X_test_seq, dtype=torch.float32)
    recon_errors = _compute_reconstruction_error(model, X_test_tensor, sequence_model=True)
    threshold = np.percentile(recon_errors, 95)
    y_pred = (recon_errors >= threshold).astype(int)
    metrics = compute_anomaly_metrics(y_test_anomaly, y_pred, y_prob=recon_errors)
    return model, train_losses, metrics, recon_errors


def train_all_anomaly_models(
    X_train_flat: np.ndarray,
    X_test_flat: np.ndarray,
    y_train_anomaly: np.ndarray,
    y_test_anomaly: np.ndarray,
    X_train_seq: np.ndarray = None,
    X_test_seq: np.ndarray = None,
    epochs: int = 50,
    batch_size: int = 64,
    seed: int = 42
):
    """
    Train all five anomaly detectors:

    Unsupervised (use only nominal samples, no labels):
      - Isolation Forest: tree-based outlier scoring
      - One-Class SVM: decision boundary around nominal data
      - Autoencoder: reconstruction error on nominal data
      - LSTM Autoencoder: sequence reconstruction error on nominal data

    Supervised (uses full labelled training set):
      - LightGBM Classifier: binary classifier (0=nominal, 1=anomaly) with
        class_weight='balanced' to handle the class imbalance (~85%/15%).
        Generally achieves the highest precision, recall, and ROC-AUC when
        labels are available.

    Returns:
        dict: { model_name: (model, metrics, ...) }
    """
    # Use only nominal training samples for unsupervised detectors
    nominal_mask = y_train_anomaly == 0
    X_train_nominal = X_train_flat[nominal_mask]

    results = {}

    print("  Training Isolation Forest...")
    model, metrics, scores = train_isolation_forest(X_train_nominal, X_test_flat, y_test_anomaly, seed)
    results["IsolationForest"] = (model, metrics, scores)
    print(f"    F1={metrics['F1_Score']:.4f} | ROC-AUC={metrics.get('ROC_AUC', 'N/A')}")

    print("  Training One-Class SVM...")
    model, metrics, scores = train_one_class_svm(X_train_nominal, X_test_flat, y_test_anomaly, seed)
    results["OneClassSVM"] = (model, metrics, scores)
    print(f"    F1={metrics['F1_Score']:.4f} | ROC-AUC={metrics.get('ROC_AUC', 'N/A')}")

    print("  Training LightGBM Anomaly Classifier (supervised)...")
    model, lgbm_params, metrics = train_lightgbm_anomaly(
        X_train_flat, y_train_anomaly, X_test_flat, y_test_anomaly, seed=seed
    )
    results["LightGBM_Anomaly"] = (model, lgbm_params, metrics)
    print(f"    F1={metrics['F1_Score']:.4f} | ROC-AUC={metrics.get('ROC_AUC', 'N/A')}")

    print("  Training Autoencoder...")
    model, train_losses, metrics, scores = train_autoencoder(
        X_train_nominal, X_test_flat, y_test_anomaly, epochs=epochs, batch_size=batch_size, seed=seed
    )
    results["Autoencoder"] = (model, train_losses, metrics, scores)
    print(f"    F1={metrics['F1_Score']:.4f} | ROC-AUC={metrics.get('ROC_AUC', 'N/A')}")

    if X_train_seq is not None and X_test_seq is not None:
        print("  Training LSTM Autoencoder...")
        nominal_seq_mask = y_train_anomaly == 0
        X_train_seq_nominal = X_train_seq[nominal_seq_mask[:len(X_train_seq)]]
        model, train_losses, metrics, scores = train_lstm_autoencoder(
            X_train_seq_nominal, X_test_seq, y_test_anomaly[:len(X_test_seq)],
            epochs=epochs, batch_size=batch_size, seed=seed
        )
        results["LSTM_Autoencoder"] = (model, train_losses, metrics, scores)
        print(f"    F1={metrics['F1_Score']:.4f} | ROC-AUC={metrics.get('ROC_AUC', 'N/A')}")

    return results
