from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from backend.app.api.routes import router
from backend.app.config import MODEL_PATH, PREPROCESSOR_PATH, LABEL_ENCODER_PATH

ROOT = Path(__file__).resolve().parents[2]
DIST = ROOT / "frontend" / "dist"

app = FastAPI(
    title="RAG-Based Explainable AI Cybersecurity Assistant",
    version="1.0.0",
    description="CIC-IDS2017 Random Forest detection + explainability + local RAG guidance.",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(router)

@app.get("/health")
def health():
    models_ready = (
        MODEL_PATH.exists()
        and PREPROCESSOR_PATH.exists()
        and LABEL_ENCODER_PATH.exists()
    )
    return {
        "status": "healthy",
        "model_artifacts_loaded": models_ready,
        "frontend_built": (DIST / "index.html").exists(),
    }

@app.get("/dashboard")
def dashboard():
    index = DIST / "index.html"
    if index.exists():
        return FileResponse(index)
    return {"message": "Frontend dashboard not built"}

# Serve frontend static assets & SPA fallback
if DIST.exists():
    app.mount("/", StaticFiles(directory=str(DIST), html=True), name="frontend")
else:
    @app.get("/")
    def root_fallback():
        return {
            "message": "RAG Cybersecurity Assistant API is running",
            "docs": "/docs",
            "frontend_status": "frontend/dist not found. Build frontend with `npm run build` or use API."
        }
