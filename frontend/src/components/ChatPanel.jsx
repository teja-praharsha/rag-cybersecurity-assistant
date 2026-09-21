import React from "react";

export default function ChatPanel() {
  return (
    <div className="card chat-panel-card">
      <div className="card-header">
        <h3>SOC Analyst Telemetry</h3>
        <p>Real-time threat feeds and assistant status.</p>
      </div>
      <div className="chat-placeholder">
        <p>Select any network flow above to trigger the RAG pipeline and review explainable model output.</p>
      </div>
    </div>
  );
}