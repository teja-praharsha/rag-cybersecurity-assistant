from backend.app.ml.model import load_artifacts
from backend.app.ml.preprocessing import clean_input
from backend.app.ml.explain import explain_prediction

def predict_attack(data):
    model, preprocessor, encoder = load_artifacts()
    df = clean_input(data)

    expected = list(getattr(preprocessor, "feature_names_in_", []))
    if expected:
        missing = [c for c in expected if c not in df.columns]
        if missing:
            return {
                "status": "invalid_input",
                "message": f"Missing {len(missing)} CIC-IDS2017 features.",
                "missing_features": missing[:15],
            }
        df = df[expected]

    X = preprocessor.transform(df)
    encoded = int(model.predict(X)[0])
    label = str(encoder.inverse_transform([encoded])[0])
    probabilities = model.predict_proba(X)[0] if hasattr(model, "predict_proba") else None
    confidence = float(probabilities.max()) if probabilities is not None else None

    return {
        "status": "ok",
        "attack": label,
        "confidence": confidence,
        "explanation": explain_prediction(model, expected, encoded, confidence),
    }
