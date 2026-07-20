"""
synthetic_generator.py
-----------------------
Generates a stream of synthetic C-MAPSS-like sensor readings for a simulated
degrading engine. Each call to `next_cycle()` returns one row matching the
exact schema that the training pipeline expects (14 sensors + 3 op_settings).

Degradation model:
  - Engine starts healthy (cycle 1) and degrades linearly until `max_cycles`.
  - Each sensor drifts from its nominal value towards its failure value.
  - Gaussian noise is added to simulate real sensor variability.
  - The exact sensor ranges are derived from C-MAPSS dataset statistics.
"""

from __future__ import annotations

import numpy as np
import pandas as pd
from dataclasses import dataclass, field
from typing import Optional

# ---------------------------------------------------------------------------
# Sensor range constants — derived from C-MAPSS FD001–FD004 training data.
# Format: { sensor_name: (nominal_value, failure_value, noise_std) }
# Sensors that rise on degradation have failure_value > nominal_value.
# Sensors that fall on degradation have failure_value < nominal_value.
# ---------------------------------------------------------------------------
SENSOR_PROFILES: dict[str, tuple[float, float, float]] = {
    "sensor_2":  (642.0,  699.0,  3.0),   # rises
    "sensor_3":  (1590.0, 1620.0, 5.0),   # rises
    "sensor_4":  (1410.0, 1460.0, 8.0),   # rises
    "sensor_7":  (554.0,  549.0,  1.5),   # falls
    "sensor_8":  (2388.0, 2388.0, 0.5),   # near-constant (slight rise)
    "sensor_9":  (9065.0, 9000.0, 30.0),  # falls
    "sensor_11": (47.2,   47.5,   0.2),   # rises
    "sensor_12": (521.0,  522.0,  0.3),   # rises
    "sensor_13": (2388.0, 2388.0, 0.5),   # near-constant
    "sensor_14": (8139.0, 8070.0, 25.0),  # falls
    "sensor_15": (8.42,   8.45,   0.02),  # rises
    "sensor_17": (392.0,  396.0,  1.0),   # rises
    "sensor_20": (38.8,   39.1,   0.15),  # rises
    "sensor_21": (23.3,   23.5,   0.05),  # rises
}

# Operational settings — FD001 is single-condition, FD002-FD004 are multi-condition
# We simulate a fixed operating point for simplicity
OP_SETTING_PROFILES: dict[str, tuple[float, float]] = {
    "op_setting_1": (0.0,   0.001),   # (value, noise_std)
    "op_setting_2": (0.0,   0.0003),
    "op_setting_3": (100.0, 0.0),
}


@dataclass
class SyntheticEngine:
    """
    Simulates one degrading engine unit.

    Args:
        unit_id:    Identifier string for this engine (e.g. "SIM-001").
        dataset:    Which dataset variant this engine mimics ("FD001"–"FD004").
        max_cycles: Total lifespan in cycles before failure. Default 200.
        seed:       Random seed for reproducibility.
    """
    unit_id: str
    dataset: str = "FD004"
    max_cycles: int = 200
    seed: Optional[int] = None
    _cycle: int = field(default=0, init=False, repr=False)
    _rng: np.random.Generator = field(default=None, init=False, repr=False)

    def __post_init__(self) -> None:
        self._rng = np.random.default_rng(self.seed)

    @property
    def current_cycle(self) -> int:
        return self._cycle

    @property
    def true_rul(self) -> int:
        """Ground-truth RUL (hidden in production; used only for validation)."""
        remaining = self.max_cycles - self._cycle
        return max(0, min(125, remaining))   # matches training clip of 125

    @property
    def is_failed(self) -> bool:
        return self._cycle >= self.max_cycles

    def _degradation_factor(self) -> float:
        """
        Returns a value in [0, 1] representing how far along the degradation
        curve this engine is. 0 = healthy, 1 = failed.
        Uses a slightly non-linear (quadratic) ramp to mimic real wear curves.
        """
        linear = self._cycle / self.max_cycles
        return min(1.0, linear ** 1.3)   # quadratic ramp — faster near end

    def next_cycle(self) -> pd.Series:
        """
        Advance engine by one cycle and return a sensor reading row.

        Returns:
            pd.Series with keys: unit_number, time_in_cycles, op_setting_1/2/3,
            sensor_2 through sensor_21 (14 informative only).
        """
        if self.is_failed:
            raise StopIteration(f"Engine {self.unit_id} has already failed at cycle {self.max_cycles}.")

        self._cycle += 1
        deg = self._degradation_factor()

        row: dict[str, float] = {
            "unit_number":    1,          # always 1 — single virtual engine
            "time_in_cycles": self._cycle,
        }

        # Operational settings
        for col, (val, noise) in OP_SETTING_PROFILES.items():
            row[col] = self._rng.normal(loc=val, scale=noise)

        # Sensor readings — interpolate from nominal to failure value
        for sensor, (nominal, failure, noise_std) in SENSOR_PROFILES.items():
            base = nominal + deg * (failure - nominal)
            row[sensor] = self._rng.normal(loc=base, scale=noise_std)

        return pd.Series(row)

    def reset(self) -> None:
        """Reset engine to healthy state (cycle 0)."""
        self._cycle = 0
        self._rng = np.random.default_rng(self.seed)


def create_engines(
    datasets: list[str] = ("FD001", "FD002", "FD003", "FD004"),
    max_cycles: int = 200,
    seed: int = 42,
) -> dict[str, SyntheticEngine]:
    """
    Create one synthetic engine per dataset variant.

    Args:
        datasets:   List of dataset labels to simulate.
        max_cycles: Total lifespan for each engine.
        seed:       Base random seed (each engine gets seed + index).

    Returns:
        Dict mapping dataset label → SyntheticEngine instance.
    """
    return {
        ds: SyntheticEngine(
            unit_id=f"SIM-{ds}",
            dataset=ds,
            max_cycles=max_cycles,
            seed=seed + i,
        )
        for i, ds in enumerate(datasets)
    }
