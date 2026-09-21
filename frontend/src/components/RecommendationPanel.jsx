import React, { useState } from "react";

export default function RecommendationPanel({ guidance = [], sources = [] }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [copied, setCopied] = useState(false);
  const [expandedCitation, setExpandedCitation] = useState(0);

  const toggleStep = (idx) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const copyTriageNotes = () => {
    const text = [
      "=== SOC INCIDENT TRIAGE SUMMARY ===",
      ...guidance.map((g, idx) => `[${completedSteps[idx] ? "X" : " "}] Step ${idx + 1}: ${g}`),
      "",
      "=== GROUNDED RAG SOURCES ===",
      ...sources.map((s) => `• ${s.source} (Relevance: ${(s.score * 100).toFixed(1)}%)`),
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cyber-card playbook-card">
      <div className="card-top-bar">
        <div>
          <h2 className="card-heading">Incident Response Playbook</h2>
          <p className="card-subheading">Actionable triage procedures &amp; containment</p>
        </div>
        <button
          type="button"
          className="header-action-btn"
          onClick={copyTriageNotes}
          title="Copy incident triage summary to clipboard"
        >
          {copied ? "✓ Copied" : "📋 Copy Triage"}
        </button>
      </div>

      {/* Actionable Checklist */}
      <div className="checklist-group">
        {guidance.map((step, idx) => {
          const isDone = !!completedSteps[idx];
          return (
            <label
              key={idx}
              className={`checklist-item ${isDone ? "checklist-completed" : ""}`}
            >
              <input
                type="checkbox"
                className="checklist-checkbox"
                checked={isDone}
                onChange={() => toggleStep(idx)}
              />
              <span className="checklist-text">{step}</span>
            </label>
          );
        })}
      </div>

      {/* Grounded Framework Evidence */}
      <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
            Grounded Citations (RAG)
          </span>
          <span className="meta-chip">{sources.length} Docs</span>
        </div>

        <div className="citations-wrapper">
          {sources.map((source, idx) => {
            const isExpanded = expandedCitation === idx;
            const scorePct = source.score ? (source.score * 100).toFixed(1) : "—";
            return (
              <div
                key={idx}
                className="citation-card"
                onClick={() => setExpandedCitation(isExpanded ? null : idx)}
              >
                <div className="citation-header">
                  <span className="citation-source-name">
                    <span>📄</span>
                    <span>{source.source}</span>
                  </span>
                  <span className="citation-score-pill">
                    {scorePct}% match
                  </span>
                </div>
                {isExpanded && (
                  <p className="citation-snippet-text">
                    {source.snippet}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}