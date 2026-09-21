from pathlib import Path
import os

PROJECT_ROOT = Path(__file__).resolve().parents[2]
MODEL_DIR = PROJECT_ROOT / "backend" / "models"
KB_DIR = PROJECT_ROOT / "data" / "knowledge_base"
DEMO_PATH = PROJECT_ROOT / "data" / "demo_samples.json"

MODEL_PATH = MODEL_DIR / "cybersecurity_model.joblib"
PREPROCESSOR_PATH = MODEL_DIR / "preprocessor.joblib"
LABEL_ENCODER_PATH = MODEL_DIR / "label_encoder.joblib"

HOST = os.getenv("API_HOST", "127.0.0.1")
PORT = int(os.getenv("API_PORT", "8000"))
