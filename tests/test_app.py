import json
from pathlib import Path
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.config import DEMO_PATH

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "model_artifacts_loaded" in data
    assert data["model_artifacts_loaded"] is True

def test_demo_ddos():
    response = client.get("/api/demo/DDoS")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["attack"] == "DDoS"
    assert "confidence" in data
    assert "explanation" in data
    assert len(data["explanation"]) > 0
    assert "guidance" in data
    assert "sources" in data

def test_demo_portscan():
    response = client.get("/api/demo/PortScan")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["attack"] == "PortScan"
    assert "explanation" in data

def test_demo_benign():
    response = client.get("/api/demo/BENIGN")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["attack"] == "BENIGN"

def test_analyze_custom_payload():
    samples = json.loads(DEMO_PATH.read_text(encoding="utf-8"))
    payload = {"data": samples["DDoS"]}
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["attack"] == "DDoS"

def test_search_knowledge_base():
    payload = {"query": "DDoS mitigation and incident response", "top_k": 3}
    response = client.post("/api/search", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert isinstance(data["results"], list)
    if data["results"]:
        first = data["results"][0]
        assert "source" in first
        assert "score" in first
        assert "snippet" in first

def test_knowledge_list():
    response = client.get("/api/knowledge")
    assert response.status_code == 200
    data = response.json()
    assert "documents" in data
    assert len(data["documents"]) >= 4

def test_frontend_serving():
    # Verify root serves index.html
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers.get("content-type", "")
