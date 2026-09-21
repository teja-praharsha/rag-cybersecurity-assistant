import React from "react";

export default function RecommendationPanel({ items = [] }) {
  return (
    <div className="card guidance-card">
      <div className="card-header">
        <div className="card-title-row">
          <h3>Incident Response Guidance</h3>
          <span className="info-tag playbook-tag">Playbook Active</span>
        </div>
        <p>Recommended triage and containment protocols aligned with standard security frameworks.</p>
      </div>

      {items.length === 0 ? (
        <p className="empty-notice">No specific guidance generated. Select a flow above to generate advisory.</p>
      ) : (
        <ul className="guidance-list">
          {items.map((action, idx) => (
            <li key={idx} className="guidance-item">
              <span className="guidance-step">{idx + 1}</span>
              <span className="guidance-text">{action}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}