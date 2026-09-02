"""Stateful Circuit Breaker for MechSage external LLM/API calls.

Implements the classic 3-state circuit breaker pattern:
  - CLOSED  : normal operation; failures are counted
  - OPEN    : all calls rejected immediately (fast-fail) until cooldown expires
  - HALF-OPEN: one probe call allowed; success → CLOSED, failure → OPEN

Usage:
    from app.core.circuit_breaker import CircuitBreaker, CircuitOpenError

    _breaker = CircuitBreaker(failure_threshold=5, cooldown_secs=60)

    try:
        result = _breaker.call(my_llm_function, arg1, arg2)
    except CircuitOpenError:
        # circuit is open — route to fallback / human review
        ...
"""

from __future__ import annotations

import threading
import time
from enum import Enum
from typing import Any, Callable


class BreakerState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"


class CircuitOpenError(RuntimeError):
    """Raised when a call is attempted while the circuit breaker is OPEN."""


class CircuitBreaker:
    """Thread-safe circuit breaker.

    Args:
        failure_threshold: Consecutive failures before the breaker opens.
        cooldown_secs: Seconds to wait in OPEN state before trying half-open.
        name: Optional name for logging.
    """

    def __init__(
        self,
        failure_threshold: int = 5,
        cooldown_secs: float = 60.0,
        name: str = "default",
    ) -> None:
        self._threshold = failure_threshold
        self._cooldown = cooldown_secs
        self._name = name

        self._lock = threading.Lock()
        self._state = BreakerState.CLOSED
        self._failure_count = 0
        self._opened_at: float | None = None   # timestamp when breaker opened
        self._total_calls = 0
        self._total_failures = 0

    # ── Public API ────────────────────────────────────────────────────────────

    @property
    def state(self) -> BreakerState:
        with self._lock:
            return self._state

    @property
    def error_rate(self) -> float:
        """Fraction of all calls that have failed (lifetime)."""
        with self._lock:
            if self._total_calls == 0:
                return 0.0
            return self._total_failures / self._total_calls

    def call(self, func: Callable, *args: Any, **kwargs: Any) -> Any:
        """Execute *func* guarded by the circuit breaker.

        Raises:
            CircuitOpenError: if the breaker is currently OPEN.
            Any exception raised by *func* (after recording the failure).
        """
        with self._lock:
            self._total_calls += 1
            state = self._current_state()

            if state == BreakerState.OPEN:
                raise CircuitOpenError(
                    f"[CircuitBreaker:{self._name}] Circuit is OPEN — "
                    f"fast-failing to protect downstream. "
                    f"Cooldown ends in "
                    f"{max(0, self._cooldown - (time.time() - (self._opened_at or 0))):.0f}s."
                )

            if state == BreakerState.HALF_OPEN:
                print(f"[CircuitBreaker:{self._name}] HALF-OPEN — sending probe call.")

        # Call outside the lock so we don't block other threads during I/O
        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as exc:
            self._on_failure()
            raise

    def reset(self) -> None:
        """Manually force the breaker back to CLOSED state (for tests/admin)."""
        with self._lock:
            self._state = BreakerState.CLOSED
            self._failure_count = 0
            self._opened_at = None
            print(f"[CircuitBreaker:{self._name}] Manually RESET to CLOSED.")

    def status(self) -> dict:
        """Return a JSON-serializable status snapshot."""
        with self._lock:
            cooldown_remaining = 0.0
            if self._state == BreakerState.OPEN and self._opened_at:
                cooldown_remaining = max(0.0, self._cooldown - (time.time() - self._opened_at))
            return {
                "name": self._name,
                "state": self._state.value,
                "failure_count": self._failure_count,
                "failure_threshold": self._threshold,
                "total_calls": self._total_calls,
                "total_failures": self._total_failures,
                "error_rate": round(self._total_failures / max(1, self._total_calls), 4),
                "cooldown_remaining_secs": round(cooldown_remaining, 1),
            }

    # ── Private helpers ───────────────────────────────────────────────────────

    def _current_state(self) -> BreakerState:
        """Transition OPEN → HALF_OPEN if cooldown has elapsed (called under lock)."""
        if self._state == BreakerState.OPEN and self._opened_at is not None:
            elapsed = time.time() - self._opened_at
            if elapsed >= self._cooldown:
                print(f"[CircuitBreaker:{self._name}] Cooldown elapsed — transitioning to HALF-OPEN.")
                self._state = BreakerState.HALF_OPEN
        return self._state

    def _on_success(self) -> None:
        with self._lock:
            if self._state == BreakerState.HALF_OPEN:
                print(f"[CircuitBreaker:{self._name}] Probe call SUCCEEDED — transitioning to CLOSED.")
            self._state = BreakerState.CLOSED
            self._failure_count = 0
            self._opened_at = None

    def _on_failure(self) -> None:
        with self._lock:
            self._failure_count += 1
            self._total_failures += 1
            if self._state == BreakerState.HALF_OPEN:
                # Probe failed → re-open
                self._state = BreakerState.OPEN
                self._opened_at = time.time()
                print(
                    f"[CircuitBreaker:{self._name}] Probe call FAILED — "
                    f"returning to OPEN. Cooldown {self._cooldown}s."
                )
            elif self._failure_count >= self._threshold:
                self._state = BreakerState.OPEN
                self._opened_at = time.time()
                print(
                    f"[CircuitBreaker:{self._name}] ⚡ OPENED after "
                    f"{self._failure_count} consecutive failures. "
                    f"Cooldown {self._cooldown}s."
                )


# ---------------------------------------------------------------------------
# Module-level singleton breakers (one per external dependency)
# ---------------------------------------------------------------------------
llm_breaker = CircuitBreaker(
    failure_threshold=5,
    cooldown_secs=60.0,
    name="llm_gateway",
)
