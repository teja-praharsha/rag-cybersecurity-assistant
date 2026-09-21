import React from "react";

export default function Header({ health, onOpenShortcuts }) {
  const isHealthy = health?.status === "healthy" && health?.model_artifacts_loaded;

  return (
    <header className="top-header">
      <div className="brand-section">
        <div className="brand-glyph" aria-hidden="true">
          🛡️
        </div>
        <div className="brand-text">
          <h1>
            RAG DEFENSE OS
            <span className="brand-chip">v1.2 PROD</span>
          </h1>
          <p className="brand-subtitle">
            Explainable AI Intrusion Detection &amp; Local Grounded RAG Advisory
          </p>
        </div>
      </div>

      <div className="telemetry-group">
        <div className={`telemetry-pill ${isHealthy ? "pill-live" : ""}`}>
          <span className="live-dot" aria-hidden="true"></span>
          <span>{isHealthy ? "ML Models & RAG Online" : "Initializing..."}</span>
        </div>

        <div className="telemetry-pill">
          <span>⚡ Latency: 12ms</span>
        </div>

        <div className="telemetry-pill">
          <span>📚 5 Security Frameworks</span>
        </div>

        <a
          href="/docs"
          target="_blank"
          rel="noreferrer"
          className="header-action-btn"
          title="Open FastAPI Swagger Interactive Documentation"
        >
          <span>Swagger API</span>
          <span>↗</span>
        </a>
      </div>
    </header>
  );
}
