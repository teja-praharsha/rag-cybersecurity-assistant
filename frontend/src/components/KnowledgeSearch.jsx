import React, { useState } from "react";
import { searchKnowledgeBase } from "../services/api";

const SUGGESTIONS = [
  "DDoS mitigation",
  "PortScan detection",
  "NIST incident response",
  "OWASP Top 10",
  "MITRE ATT&CK lateral movement",
];

export default function KnowledgeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchQuery) => {
    const q = (searchQuery ?? query).trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const data = await searchKnowledgeBase(q, 4);
      setResults(data.results || []);
    } catch (err) {
      setError(err.message || "Search request failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="card search-card">
      <div className="card-header">
        <div className="card-title-row">
          <h3>Knowledge Base RAG Search</h3>
          <span className="info-tag tfidf-tag">TF-IDF Index</span>
        </div>
        <p>Query curated advisory notes from MITRE ATT&amp;CK, NIST, CISA, OWASP, and SOC Playbooks.</p>
      </div>

      <div className="search-bar-row">
        <div className="search-input-wrapper">
          <span className="search-input-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="e.g. DDoS containment, port scan response, NIST CSF steps..."
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleSearch()}
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search RAG"}
        </button>
      </div>

      <div className="search-chips">
        <span className="chips-label">Suggestions:</span>
        {SUGGESTIONS.map((tag) => (
          <button
            key={tag}
            className="search-chip"
            onClick={() => {
              setQuery(tag);
              handleSearch(tag);
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {error && <div className="error-banner">{error}</div>}

      {searched && (
        <div className="search-results-list">
          {results.length === 0 && !loading && (
            <p className="empty-notice">No relevant knowledge documents found for "{query}".</p>
          )}

          {results.map((r, idx) => (
            <div key={idx} className="search-result-item">
              <div className="search-result-header">
                <span className="result-doc-name">{r.source}</span>
                <span className="result-score">Relevance: {(r.score * 100).toFixed(1)}%</span>
              </div>
              <p className="result-snippet">{r.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
