import React from "react";

export default function FlowControls({ onSelectDemo, activeLabel, loading }) {
  const flows = [
    {
      id: "DDoS",
      title: "DDoS Flow",
      badge: "High Volumetric",
      badgeClass: "badge-critical",
      desc: "SYN flood / TCP volumetric pattern with port 80 target.",
    },
    {
      id: "PortScan",
      title: "PortScan Flow",
      badge: "Reconnaissance",
      badgeClass: "badge-high",
      desc: "Sequential port probing and banner discovery signatures.",
    },
    {
      id: "BENIGN",
      title: "Benign Flow",
      badge: "Normal Traffic",
      badgeClass: "badge-safe",
      desc: "Standard HTTPS/DNS flow metrics with regular packet intervals.",
    },
  ];

  return (
    <div className="card controls-card">
      <div className="card-header">
        <div className="card-title-row">
          <h3>Network Flow Ingestion</h3>
          <span className="info-tag">CIC-IDS2017 Samples</span>
        </div>
        <p>Trigger pre-packaged real network flow vectors to test the Random Forest &amp; RAG pipeline.</p>
      </div>

      <div className="flow-buttons-grid">
        {flows.map((flow) => {
          const isActive = activeLabel === flow.id;
          return (
            <button
              key={flow.id}
              className={`flow-btn ${isActive ? "flow-btn-active" : ""}`}
              onClick={() => onSelectDemo(flow.id)}
              disabled={loading}
            >
              <div className="flow-btn-top">
                <span className="flow-btn-title">{flow.title}</span>
                <span className={`flow-btn-badge ${flow.badgeClass}`}>{flow.badge}</span>
              </div>
              <p className="flow-btn-desc">{flow.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
