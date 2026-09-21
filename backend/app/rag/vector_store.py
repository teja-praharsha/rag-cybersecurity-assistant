# Prototype vector-store boundary.
# Keeping retrieval behind this module makes it straightforward to replace
# TF-IDF with FAISS, Chroma, Qdrant, or another vector database later.
from backend.app.rag.retriever import search

def query_vector_store(query, top_k=5):
    return search(query, top_k)
