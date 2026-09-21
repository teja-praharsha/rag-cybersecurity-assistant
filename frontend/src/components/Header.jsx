import React from "react";

export default function Header({ health, activeLabel }) {
  const isHealthy = health?.status === "healthy" && health?.model_artifacts_loaded;

  return (
    <header className="app-header">
      <div className="brand-group">
        <div className="brand-badge">
          <span className="brand-icon">🛡️</span>
        </div>
        <div>
          <div className="brand-title-row">
            <h1>RAG Cybersecurity Assistant</h1>
            <span className="version-tag">v1.0 • CIC-IDS2017</span>
          </div>
          <p className="brand-subtitle">
            Explainable AI Network Intrusion Detection &amp; Local RAG Advisory
          </p>
        </div>
      </div>

      <div className="header-actions">
        <div className={`status-pill ${isHealthy ? "status-online" : "status-warning"}`}>
          <span className="pulse-dot"></span>
          <span>{isHealthy ? "AI Models & RAG Ready" : "Initializing..."}</span>
        </div>
        <a
          href="/docs"
          target="_blank"
          rel="noreferrer"
          className="api-docs-link"
          title="Open FastAPI Swagger Documentation"
        >
          API Docs ↗
        </a>
      </div>
    </header>
  );
}
