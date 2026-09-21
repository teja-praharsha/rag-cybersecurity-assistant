import React from "react";

export default function FeatureImportance({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <div className="card feature-card">
        <div className="card-header">
          <h3>Feature Importance (XAI)</h3>
          <p>Global Gini impurity importance of network flow characteristics.</p>
        </div>
        <p className="empty-notice">No feature attributions available for this prediction.</p>
      </div>
    );
  }

  // Find maximum percentage to scale bars cleanly
  const maxPct = Math.max(...items.map((i) => i.percentage || 0), 10);

  return (
    <div className="card feature-card">
      <div className="card-header">
        <div className="card-title-row">
          <h3>Feature Importance (XAI)</h3>
          <span className="info-tag">Top {items.length} Attributes</span>
        </div>
        <p>Key network-flow signatures driving the model's classification decision.</p>
      </div>

      <div className="feature-list">
        {items.map((item, idx) => {
          const widthPct = Math.min(100, (item.percentage / maxPct) * 100);
          return (
            <div key={item.feature || idx} className="feature-row">
              <div className="feature-label-group">
                <span className="feature-rank">#{idx + 1}</span>
                <span className="feature-name" title={item.feature}>
                  {item.feature}
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${widthPct}%` }}
                ></div>
              </div>
              <span className="feature-percentage">{item.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}