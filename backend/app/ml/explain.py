def explain_prediction(model, feature_names, encoded_prediction, confidence, top_n=8):
    importances = getattr(model, "feature_importances_", None)
    if importances is None:
        return []
    pairs = sorted(zip(feature_names, importances), key=lambda x: x[1], reverse=True)[:top_n]
    return [
        {
            "feature": str(name),
            "importance": round(float(value), 6),
            "percentage": round(float(value) * 100, 2),
        }
        for name, value in pairs
    ]
