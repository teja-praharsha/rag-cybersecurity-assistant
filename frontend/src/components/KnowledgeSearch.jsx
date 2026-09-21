import React, { useState, useRef, useEffect } from "react";
import { searchKnowledgeBase } from "../services/api";

const SEARCH_CHIPS = [
  "DDoS mitigation",
  "PortScan detection",
  "NIST CSF response",
  "OWASP Top 10",
  "MITRE ATT&CK techniques",
  "Containment protocol",
];

export default function KnowledgeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const inputRef = useRef(null);

  // Global hotkey '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = async (searchTerm) => {
    const q = (searchTerm ?? query).trim();
    if (!q) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchKnowledgeBase(q, 4);
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const copySnippet = (snippet, idx) => {
    navigator.clipboard.writeText(snippet);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  return (
    <section className="cyber-card search-hub-section">
      <div className="card-top-bar">
        <div>
          <h2 className="card-heading">Knowledge Base RAG Explorer</h2>
          <p className="card-subheading">
            Semantic search across MITRE ATT&amp;CK, NIST CSF, CISA, OWASP, and Incident Playbooks
          </p>
        </div>
        <span className="meta-chip">TF-IDF Vector Space</span>
      </div>

      {/* Modern Search Bar with Shortcut Tag */}
      <div className="search-input-shell">
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          className="search-field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search cybersecurity playbooks, CVE mitigations, MITRE ATT&CK techniques..."
        />
        <span className="search-kbd-tag" title="Press / anywhere to focus">/</span>
        <button
          type="button"
          className="search-action-btn"
          onClick={() => handleSearch()}
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search RAG"}
        </button>
      </div>

      {/* Quick Search Filter Chips */}
      <div className="search-chips-row">
        <span className="chips-title">Frequent queries:</span>
        {SEARCH_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="chip-tag-btn"
            onClick={() => {
              setQuery(chip);
              handleSearch(chip);
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {searched && (
        <div className="search-results-grid">
          {results.length === 0 && !loading && (
            <p style={{ color: "var(--text-muted)", fontSize: "12px", gridColumn: "1 / -1" }}>
              No document matches found for "{query}".
            </p>
          )}

          {results.map((res, idx) => (
            <div key={idx} className="search-result-card">
              <div className="search-result-meta">
                <span className="search-result-title">📄 {res.source}</span>
                <span className="search-result-score">
                  {(res.score * 100).toFixed(1)}% match
                </span>
              </div>
              <p className="search-result-snippet">{res.snippet}</p>
              <div style={{ marginTop: "auto", paddingTop: "6px" }}>
                <button
                  type="button"
                  className="header-action-btn"
                  style={{ padding: "4px 10px", fontSize: "10px" }}
                  onClick={() => copySnippet(res.snippet, idx)}
                >
                  {copiedIdx === idx ? "✓ Copied" : "Copy Snippet"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
