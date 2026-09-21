from fastapi import APIRouter
from pydantic import BaseModel, Field
from backend.app.services.cybersecurity_services import analyze, demo
from backend.app.rag.retriever import search, load_documents

router = APIRouter(prefix="/api")

class TrafficPayload(BaseModel):
    data: dict = Field(...)

class SearchPayload(BaseModel):
    query: str
    top_k: int = 5

@router.post("/analyze")
def analyze_route(payload: TrafficPayload):
    return analyze(payload.data)

@router.get("/demo/{label}")
def demo_route(label: str):
    return demo(label)

@router.post("/search")
def search_route(payload: SearchPayload):
    return {"results": search(payload.query, payload.top_k)}

@router.get("/knowledge")
def knowledge_route():
    return {"documents": [d["source"] for d in load_documents()]}
