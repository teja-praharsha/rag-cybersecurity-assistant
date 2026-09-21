import React from "react";

export default function FeatureImportance({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <div className="cyber-card" style={{ minHeight: "340px", justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>No feature importances available.</p>
      </div>
    );
  }

  // Calculate highest percentage for visual scaling
  const maxPct = Math.max(...items.map((i) => i.percentage || 0), 10);

  return (
    <div className="cyber-card">
      <div className="card-top-bar">
        <div>
          <h2 className="card-heading">Explainable AI (XAI) Attributions</h2>
          <p className="card-subheading">Network-flow features driving Random Forest classification</p>
        </div>
        <span className="meta-chip">Gini Criterion</span>
      </div>

      <div className="xai-features-container">
        {items.map((item, idx) => {
          const widthRatio = Math.min(100, (item.percentage / maxPct) * 100);
          return (
            <div key={item.feature || idx} className="xai-row">
              <div className="xai-label-box">
                <span className="xai-rank-num">0{idx + 1}</span>
                <span className="xai-feature-name" title={item.feature}>
                  {item.feature}
                </span>
              </div>

              <div className="xai-bar-track">
                <div
                  className="xai-bar-fill"
                  style={{ width: `${widthRatio}%` }}
                ></div>
              </div>

              <span className="xai-percentage-badge">{item.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}