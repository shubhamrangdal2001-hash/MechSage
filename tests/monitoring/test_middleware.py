import pytest
import httpx
from fastapi import FastAPI
from app.main import app, _metrics

@pytest.fixture(autouse=True)
def reset_metrics():
    # Reset the singleton metrics store before each test
    _metrics.__init__()
    yield
    _metrics.__init__()

@pytest.mark.asyncio
async def test_middleware_records_latency_and_status():
    async with httpx.AsyncClient(app=app, base_url="http://testserver") as client:
        # Make a successful request
        resp = await client.get("/readiness")
        assert resp.status_code == 200
        # Make a request that triggers an error (invalid endpoint)
        resp_err = await client.get("/nonexistent")
        assert resp_err.status_code == 404
    # Verify metrics recorded
    snap = _metrics.snapshot()
    # Two requests total
    assert snap["requests"]["total_last_hour"] == 2
    # One error recorded (404 counts as error >=400)
    assert snap["requests"]["error_count"] == 1
    # Error rate should be 50%
    assert snap["requests"]["error_rate_pct"] == pytest.approx(50.0)
    # Latency percentiles should be >0
    assert snap["latency"]["p50_ms"] > 0
    # Verify per-endpoint counts
    ep_counts = snap["requests"]["by_endpoint"]
    assert "/readiness" in ep_counts and ep_counts["/readiness"] == 1
    assert "/nonexistent" in ep_counts and ep_counts["/nonexistent"] == 1
