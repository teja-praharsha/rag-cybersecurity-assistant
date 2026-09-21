from pathlib import Path
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from backend.app.config import KB_DIR

def load_documents():
    docs = []
    for path in sorted(KB_DIR.rglob("*")):
        if path.suffix.lower() in {".md", ".txt"}:
            docs.append({
                "source": str(path.relative_to(KB_DIR)),
                "text": path.read_text(encoding="utf-8", errors="ignore"),
            })
    return docs

def search(query, top_k=5):
    docs = load_documents()
    if not docs:
        return []

    texts = [d["text"] for d in docs]
    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform(texts + [query])
    scores = (matrix[:-1] @ matrix[-1].T).toarray().ravel()
    order = scores.argsort()[::-1]

    results = []
    for i in order[:top_k]:
        if scores[i] <= 0:
            continue
        results.append({
            "source": docs[i]["source"],
            "score": round(float(scores[i]), 4),
            "snippet": docs[i]["text"][:900].strip(),
        })
    return results
