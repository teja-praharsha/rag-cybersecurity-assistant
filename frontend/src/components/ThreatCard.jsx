import React from "react";

export default function ThreatCard({ result, loading }) {
  if (loading) {
    return (
      <div className="card threat-card loading-state">
        <div className="spinner"></div>
        <p>Analyzing network flow telemetry with Random Forest...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card threat-card placeholder-state">
        <div className="placeholder-icon">⚡</div>
        <h3>No Flow Analyzed Yet</h3>
        <p>Select a demonstration flow or submit raw packet telemetry to evaluate intrusion vectors.</p>
      </div>
    );
  }

  const isBenign = result.attack === "BENIGN";
  const confidencePct = result.confidence != null ? (result.confidence * 100).toFixed(1) : "—";

  const getSeverityBadge = (attack) => {
    if (attack === "BENIGN") return { label: "SAFE / NORMAL", className: "badge-safe" };
    if (attack === "DDoS" || attack.includes("DoS")) return { label: "CRITICAL SEVERITY", className: "badge-critical" };
    if (attack === "PortScan" || attack.includes("Patator")) return { label: "HIGH SEVERITY", className: "badge-high" };
    return { label: "SUSPICIOUS ACTIVITY", className: "badge-warning" };
  };

  const badge = getSeverityBadge(result.attack);

  return (
    <div className={`card threat-card ${isBenign ? "threat-safe" : "threat-alert"}`}>
      <div className="threat-header">
        <div>
          <span className={`threat-badge ${badge.className}`}>{badge.label}</span>
          <h2 className="threat-title">{result.attack}</h2>
        </div>
        <div className="confidence-meter">
          <span className="confidence-value">{confidencePct}%</span>
          <span className="confidence-label">RF Confidence</span>
        </div>
      </div>

      <div className="flow-meta-bar">
        <div className="flow-meta-item">
          <span className="meta-label">Detection Engine</span>
          <span className="meta-value">Balanced Random Forest</span>
        </div>
        <div className="flow-meta-item">
          <span className="meta-label">Dataset Baseline</span>
          <span className="meta-value">CIC-IDS2017</span>
        </div>
        <div className="flow-meta-item">
          <span className="meta-label">Evaluated Flow</span>
          <span className="meta-value">{result.demo_label || "Live / Ingestion"}</span>
        </div>
      </div>
    </div>
  );
}