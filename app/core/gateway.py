"""Centralized LiteLLM Gateway for MechSage.

ALL LLM calls in the entire codebase must go through this module.
No agent should directly import openai or call a provider SDK.

Features:
  - Primary provider: OpenRouter (any model)
  - Automatic fallback: Gemini direct (google/gemini-2.5-flash) on 429/500
  - True exponential backoff with jitter
  - Circuit breaker integration (fails fast when provider is degraded)
  - Configurable timeout per call

Usage:
    from app.core.gateway import llm_complete

    text = llm_complete(
        model="google/gemini-2.5-flash",
        system="You are ...",
        user="...",
        max_tokens=256,
    )
"""

from __future__ import annotations

import os
import random
import time
from pathlib import Path
from typing import Optional

# Load .env from project root if present
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parents[2] / ".env"
    load_dotenv(dotenv_path=_env_path, override=False)
except ImportError:
    pass

import litellm

from app.core.circuit_breaker import llm_breaker, CircuitOpenError

# ── Gateway Configuration ─────────────────────────────────────────────────────

# LiteLLM router: primary → OpenRouter, fallback → Google Gemini direct
_OPENROUTER_BASE = "openrouter/google/gemini-2.5-flash"   # cheap default
_FALLBACK_MODEL   = "gemini/gemini-1.5-flash"             # direct Gemini fallback

MAX_RETRIES = 3
INITIAL_BACKOFF_SECS = 2.0   # starts at 2s, doubles with jitter → max 30s
MAX_BACKOFF_SECS = 30.0
CALL_TIMEOUT_SECS = 45.0     # per-attempt wall-clock timeout

# Suppress litellm verbose logging unless DEBUG is set
litellm.set_verbose = os.getenv("LITELLM_DEBUG", "0") == "1"


# ── Internal helpers ──────────────────────────────────────────────────────────

def _build_messages(system: str, user: str) -> list[dict]:
    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": user})
    return messages


def _openrouter_model(model: str) -> str:
    """Prefix model name with openrouter/ for LiteLLM routing."""
    if model.startswith("openrouter/"):
        return model
    return f"openrouter/{model}"


def _is_transient(err_str: str) -> bool:
    """Return True if the error is likely transient (rate-limit, network)."""
    markers = ["429", "rate limit", "rate_limit", "connection error",
               "timeout", "connect", "overloaded", "503", "502"]
    err_lower = err_str.lower()
    return any(m in err_lower for m in markers)


def _backoff(attempt: int) -> float:
    """Exponential backoff with jitter: min(initial * 2^attempt + jitter, max)."""
    wait = min(INITIAL_BACKOFF_SECS * (2 ** attempt) + random.uniform(0, 1), MAX_BACKOFF_SECS)
    return wait


# ── Public API ────────────────────────────────────────────────────────────────

def llm_complete(
    model: str,
    system: str,
    user: str,
    *,
    max_tokens: int = 512,
    temperature: float = 0.1,
    timeout: float = CALL_TIMEOUT_SECS,
) -> str:
    """Make a chat completion call through the LiteLLM gateway.

    Routing:
      1. Primary: OpenRouter → ``model``
      2. Fallback: Google Gemini direct (on 429/500 from primary)

    Circuit breaker: if the LLM provider accumulates >= 5 consecutive failures,
    the breaker OPENS and this function raises CircuitOpenError immediately
    without making a network call.

    Args:
        model: OpenRouter model string, e.g. "google/gemini-2.5-flash"
        system: System prompt content.
        user: User message content.
        max_tokens: Maximum tokens in the response.
        temperature: Sampling temperature.
        timeout: Per-attempt timeout in seconds.

    Returns:
        The assistant response text (stripped).

    Raises:
        CircuitOpenError: If the circuit breaker is OPEN.
        RuntimeError: If all retries are exhausted on both primary and fallback.
    """
    messages = _build_messages(system, user)

    def _single_attempt(llm_model: str) -> str:
        """One attempt to call litellm with the given model."""
        response = litellm.completion(
            model=llm_model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
            timeout=timeout,
            api_key=os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENROUTER_KEY"),
            api_base="https://openrouter.ai/api/v1" if llm_model.startswith("openrouter/") else None,
            extra_headers={
                "HTTP-Referer": "https://github.com/MechSage",
                "X-Title": "MechSage",
            } if llm_model.startswith("openrouter/") else {},
        )
        return response.choices[0].message.content.strip()

    primary_model = _openrouter_model(model)
    last_exc: Optional[Exception] = None

    # ── Primary: OpenRouter with retry ────────────────────────────────────────
    for attempt in range(MAX_RETRIES + 1):
        try:
            # Every attempt goes through the circuit breaker
            return llm_breaker.call(_single_attempt, primary_model)

        except CircuitOpenError:
            # Breaker open — immediately try fallback, no retries on primary
            print(f"[Gateway] Circuit OPEN on primary '{primary_model}'. Trying fallback.")
            break

        except Exception as exc:
            last_exc = exc
            err_str = str(exc)
            print(f"[Gateway] Primary attempt {attempt + 1}/{MAX_RETRIES + 1} failed: {type(exc).__name__}: {err_str}")

            if _is_transient(err_str) and attempt < MAX_RETRIES:
                wait = _backoff(attempt)
                print(f"[Gateway] Transient error — waiting {wait:.1f}s before retry...")
                time.sleep(wait)
                continue

            # Non-transient error — skip remaining retries, go to fallback
            print(f"[Gateway] Non-transient error on primary. Falling back.")
            break

    # ── Fallback: Google Gemini direct ────────────────────────────────────────
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if gemini_key:
        print(f"[Gateway] Attempting fallback model: {_FALLBACK_MODEL}")
        try:
            response = litellm.completion(
                model=_FALLBACK_MODEL,
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature,
                timeout=timeout,
                api_key=gemini_key,
            )
            print(f"[Gateway] Fallback succeeded via {_FALLBACK_MODEL}.")
            return response.choices[0].message.content.strip()
        except Exception as fb_exc:
            print(f"[Gateway] Fallback also failed: {fb_exc}")
            last_exc = fb_exc
    else:
        print("[Gateway] No GEMINI_API_KEY set — fallback unavailable.")

    # ── Both primary and fallback exhausted ───────────────────────────────────
    raise RuntimeError(
        f"[Gateway] All LLM providers failed after {MAX_RETRIES + 1} attempts. "
        f"Last error: {last_exc}"
    ) from last_exc


def get_breaker_status() -> dict:
    """Return the current circuit breaker status (for monitoring dashboard)."""
    return llm_breaker.status()
