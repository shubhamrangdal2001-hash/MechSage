import pytest
from app.main import MetricsStore

@pytest.fixture
def store():
    return MetricsStore()

def test_record_and_snapshot_basic(store: MetricsStore):
    # Record a few requests
    store.record_request('/test', 100.0, 200)
    store.record_request('/test', 200.0, 500)
    store.record_request('/other', 150.0, 200)
    snap = store.snapshot()
    # Verify total request count
    assert snap['requests']['total_last_hour'] == 3
    # Verify error count (one 500)
    assert snap['requests']['error_count'] == 1
    # Verify error rate percentage (approx 33.33)
    assert snap['requests']['error_rate_pct'] == pytest.approx(33.33, rel=1e-2)
    # Verify latency percentiles
    lat = snap['latency']
    assert lat['p50_ms'] == 150.0
    assert lat['p95_ms'] == 200.0
    assert lat['p99_ms'] == 200.0
    # Verify per-endpoint averages
    assert snap['latency']['by_endpoint']['/test'] == pytest.approx((100 + 200) / 2)
    assert snap['latency']['by_endpoint']['/other'] == 150.0

def test_percentile_calculation_edge_cases(store: MetricsStore):
    # No samples – expect zeros
    snap = store.snapshot()
    lat = snap['latency']
    assert lat['p50_ms'] == 0
    assert lat['p95_ms'] == 0
    assert lat['p99_ms'] == 0

def test_thread_safety(store: MetricsStore):
    import threading
    def record_many():
        for _ in range(1000):
            store.record_request('/concurrent', 120.0, 200)
    threads = [threading.Thread(target=record_many) for _ in range(5)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    snap = store.snapshot()
    # Expect 5000 total requests (5*1000)
    assert snap['requests']['total_last_hour'] == 5000
    # Verify no errors recorded
    assert snap['requests']['error_count'] == 0
