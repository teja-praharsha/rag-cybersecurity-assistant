import React, { useState, useEffect } from "react";
import { analyzeTraffic } from "../services/api";

export default function FlowInspectorModal({ isOpen, onClose, flowData, onApplyCustomResult }) {
  const [features, setFeatures] = useState({});
  const [filterText, setFilterText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [customVerdict, setCustomVerdict] = useState(null);

  useEffect(() => {
    if (flowData) {
      setFeatures({ ...flowData });
      setCustomVerdict(null);
    }
  }, [flowData, isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleValueChange = (key, val) => {
    const parsed = Number(val);
    setFeatures((prev) => ({
      ...prev,
      [key]: isNaN(parsed) ? val : parsed,
    }));
  };

  const handleRunSimulation = async () => {
    setAnalyzing(true);
    try {
      const result = await analyzeTraffic(features);
      setCustomVerdict(result);
      if (onApplyCustomResult) {
        onApplyCustomResult(result, features);
      }
    } catch (err) {
      alert(`Simulation failed: ${err.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  const filteredKeys = Object.keys(features).filter((k) =>
    k.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3 className="drawer-title">Network Flow Inspector</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "11px", marginTop: "2px" }}>
              78 CIC-IDS2017 flow telemetry features
            </p>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            className="search-field"
            style={{
              background: "var(--bg-subtle)",
              border: "1px solid var(--border-subtle)",
              padding: "8px 12px",
              borderRadius: "var(--radius-xs)",
              flex: 1,
            }}
            placeholder="Filter features (e.g. Port, Length, IAT)..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button
            type="button"
            className="search-action-btn"
            onClick={handleRunSimulation}
            disabled={analyzing}
          >
            {analyzing ? "Evaluating..." : "Run ML Simulation"}
          </button>
        </div>

        {/* Live Simulation Feedback Banner */}
        {customVerdict && (
          <div
            style={{
              padding: "12px",
              borderRadius: "var(--radius-xs)",
              background:
                customVerdict.attack === "BENIGN"
                  ? "var(--emerald-bg)"
                  : "var(--critical-bg)",
              border: `1px solid ${
                customVerdict.attack === "BENIGN"
                  ? "var(--emerald-border)"
                  : "var(--critical-border)"
              }`,
              color: "#ffffff",
              fontSize: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>Verdict:</strong> {customVerdict.attack}
            </div>
            <div>
              <strong>Confidence:</strong>{" "}
              {customVerdict.confidence
                ? `${(customVerdict.confidence * 100).toFixed(1)}%`
                : "100%"}
            </div>
          </div>
        )}

        {/* Feature Fields */}
        <div className="drawer-features-list">
          {filteredKeys.map((key) => (
            <div key={key} className="drawer-feature-field">
              <span className="drawer-field-label" title={key}>
                {key}
              </span>
              <input
                type="text"
                className="drawer-field-input"
                value={features[key]}
                onChange={(e) => handleValueChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
