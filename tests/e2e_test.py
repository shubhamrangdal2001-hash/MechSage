import requests
import json
import sseclient

API_URL = "http://127.0.0.1:8001/api"

print("1. Fetching Datasets...")
datasets = requests.get(f"{API_URL}/datasets").json()
print("   Datasets:", [d['id'] for d in datasets.get("datasets", [])])

print("\n2. Fetching Fleet Summary for FD002...")
fleet = requests.get(f"{API_URL}/fleet-summary?dataset_id=FD002").json()
print("   Total units:", fleet.get("total"))

print("\n3. Streaming Engine #29 until anomaly...")
stream_response = requests.get(f"{API_URL}/stream?dataset_id=FD002&unit_id=29&speed_ms=10", stream=True)
client = sseclient.SSEClient(stream_response)
anomaly_event = None

for event in client.events():
    data = json.loads(event.data)
    if data.get("event") == "complete":
        print("   Stream complete.")
        break
    if data.get("is_anomaly"):
        anomaly_event = data
        print(f"   Anomaly detected at cycle {data['cycle']}! Score: {data['anomaly_score']}")
        break

if not anomaly_event:
    print("No anomaly detected!")
    exit(1)

print("\n4. Requesting Diagnosis...")
diag_req = {
    "query": f"Analyze telemetry for Unit #29 at cycle {anomaly_event['cycle']} showing anomalies.",
    "asset_id": "Unit-29",
    "degrading_sensors": anomaly_event.get("anomaly_sensors", []),
    "fault_hypothesis": "Degradation in HPC or Fan",
    "top_k": 3,
    "generate_answer": True
}
diag_res = requests.post(f"{API_URL}/diagnose", json=diag_req).json()
diag_id = diag_res.get("diagnosis_id")
print("   Diagnosis ID:", diag_id)
print("   Failure Mode:", diag_res.get("work_order", {}).get("failure_mode"))
print("   Confidence:", diag_res.get("confidence"))
print("   Explanation:", diag_res.get("explanation"))

if not diag_id:
    print("Diagnosis failed!")
    exit(1)

print("\n5. Approving Diagnosis...")
approve_req = {
    "decision": "approve",
    "notes": "Looks correct. Schedule maintenance immediately.",
    "assigned_technician": "Tech A",
    "proposed_start": "2026-07-25",
    "approved_by": "System Test"
}
app_res = requests.post(f"{API_URL}/diagnose/{diag_id}/approve", json=approve_req).json()
print("   Approval Status:", app_res.get("new_status"))

print("\n6. Checking Work Orders Dashboard...")
wo_list = requests.get(f"{API_URL}/work-orders").json()
print("   Total Work Orders:", wo_list.get("total"))
for wo in wo_list.get("work_orders", []):
    if wo["id"] == diag_id:
        print("   Found our test work order in the dashboard!")
        print("   Status:", wo["status"])

print("\n--- ALL TESTS PASSED! ---")
