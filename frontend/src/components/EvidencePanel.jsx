import React, { useState } from "react";

export default function EvidencePanel({ sources = [] }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!sources || sources.length === 0) {
    return (
      <div className="card evidence-card">
        <div className="card-header">
          <h3>Retrieved RAG Evidence</h3>
          <p>Contextual documentation retrieved via local TF-IDF semantic matching.</p>
        </div>
        <p className="empty-notice">No retrieved documents yet. Run an analysis flow to fetch relevant security notes.</p>
      </div>
    );
  }

  return (
    <div className="card evidence-card">
      <div className="card-header">
        <div className="card-title-row">
          <h3>Retrieved RAG Evidence</h3>
          <span className="info-tag">{sources.length} Context Docs</span>
        </div>
        <p>Grounded security knowledge from MITRE ATT&amp;CK, NIST CSF, CISA, OWASP, and incident playbooks.</p>
      </div>

      <div className="evidence-list">
        {sources.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          const scorePercent = item.score ? (item.score * 100).toFixed(1) : null;

          return (
            <div
              key={idx}
              className={`evidence-item ${isExpanded ? "item-expanded" : ""}`}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
            >
              <div className="evidence-item-header">
                <div className="source-info">
                  <span className="source-icon">📄</span>
                  <span className="source-name">{item.source}</span>
                </div>
                {scorePercent && (
                  <span className="source-score" title="TF-IDF Relevance Score">
                    Score: {scorePercent}%
                  </span>
                )}
              </div>
              <div className="evidence-snippet">
                <p>{item.snippet}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}