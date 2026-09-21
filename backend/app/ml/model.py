import joblib
from backend.app.config import MODEL_PATH, PREPROCESSOR_PATH, LABEL_ENCODER_PATH

def load_artifacts():
    if not (MODEL_PATH.exists() and PREPROCESSOR_PATH.exists() and LABEL_ENCODER_PATH.exists()):
        raise FileNotFoundError("Model artifacts are missing.")
    return (
        joblib.load(MODEL_PATH),
        joblib.load(PREPROCESSOR_PATH),
        joblib.load(LABEL_ENCODER_PATH),
    )
