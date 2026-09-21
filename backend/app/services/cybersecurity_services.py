import json
from backend.app.config import DEMO_PATH
from backend.app.ml.predictor import predict_attack
from backend.app.rag.retriever import search
from backend.app.rag.generator import generate_guidance

def analyze(data):
    result = predict_attack(data)
    if result["status"] != "ok":
        return result

    sources = search(result["attack"], top_k=4)
    return {
        **result,
        "guidance": generate_guidance(result["attack"], sources),
        "sources": sources,
    }

def demo(label="DDoS"):
    data = json.loads(DEMO_PATH.read_text(encoding="utf-8"))
    if label not in data:
        label = "DDoS"
    result = analyze(data[label])
    result["demo_label"] = label
    return result
