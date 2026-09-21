# Lightweight prototype embedding helper.
# The current retriever uses TF-IDF vectors so the prototype needs no external API key.
def describe_embedding_layer():
    return {
        "type": "tfidf",
        "purpose": "local prototype retrieval",
        "upgrade_path": "replace with sentence-transformers or another embedding model"
    }
