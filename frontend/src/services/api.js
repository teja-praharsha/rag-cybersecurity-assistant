/**
 * API Client for RAG Cybersecurity Assistant
 */

const BASE_URL = "";

export async function fetchHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
  return res.json();
}

export async function analyzeDemo(label) {
  const res = await fetch(`${BASE_URL}/api/demo/${encodeURIComponent(label)}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to analyze demo flow: ${res.status}`);
  }
  return res.json();
}

export async function analyzeTraffic(flowData) {
  const res = await fetch(`${BASE_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: flowData }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Analysis failed: ${res.status}`);
  }
  return res.json();
}

export async function searchKnowledgeBase(query, topK = 5) {
  const res = await fetch(`${BASE_URL}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, top_k: topK }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Search failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchKnowledgeDocs() {
  const res = await fetch(`${BASE_URL}/api/knowledge`);
  if (!res.ok) throw new Error(`Failed to load knowledge docs: ${res.status}`);
  return res.json();
}