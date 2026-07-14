import numpy as np
import pandas as pd
from scipy.stats import wasserstein_distance

def calculate_psi(expected: pd.Series, actual: pd.Series, buckets: int = 10) -> float:
    """
    Calculate the Population Stability Index (PSI) between two distributions.
    A PSI < 0.1 is safe. 
    0.1 <= PSI < 0.2 indicates minor drift.
    PSI >= 0.2 indicates significant drift.
    """
    if len(expected) == 0 or len(actual) == 0:
        return 0.0

    # Ensure we drop NaNs
    expected = expected.dropna()
    actual = actual.dropna()

    # Define the bins using quantiles of the expected distribution
    try:
        bins = np.quantile(expected, np.linspace(0, 1, buckets + 1))
        # Ensure bins are strictly increasing to avoid ValueError
        bins = np.unique(bins)
        # If there are not enough unique values to form bins, return 0
        if len(bins) < 2:
            return 0.0
    except Exception:
        return 0.0

    # Calculate frequencies of expected and actual using the same bins
    expected_freq, _ = np.histogram(expected, bins=bins)
    actual_freq, _ = np.histogram(actual, bins=bins)

    # Convert frequencies to percentages
    expected_perc = expected_freq / len(expected)
    actual_perc = actual_freq / len(actual)

    # Avoid division by zero and log(0) by replacing 0 with a very small number
    expected_perc = np.where(expected_perc == 0, 0.0001, expected_perc)
    actual_perc = np.where(actual_perc == 0, 0.0001, actual_perc)

    # Calculate PSI
    psi_values = (actual_perc - expected_perc) * np.log(actual_perc / expected_perc)
    return np.sum(psi_values)

def calculate_wasserstein(expected: pd.Series, actual: pd.Series) -> float:
    """
    Calculate the Wasserstein Distance (Earth Mover's Distance)
    between two 1D distributions.
    """
    if len(expected) == 0 or len(actual) == 0:
        return 0.0
    
    return wasserstein_distance(expected.dropna(), actual.dropna())

def calculate_latency_stats(latencies: pd.Series) -> dict:
    """
    Calculate p50, p90, p99 for a series of latency values (in ms).
    """
    if len(latencies) == 0:
        return {"p50": 0.0, "p90": 0.0, "p99": 0.0}
    
    return {
        "p50": np.percentile(latencies, 50),
        "p90": np.percentile(latencies, 90),
        "p99": np.percentile(latencies, 99)
    }
