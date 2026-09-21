import React from "react";

export default function RiskIndicator({ attack, confidence }) {
  if (!attack) return <span className="risk-pill risk-none">No Data</span>;

  let riskClass = "risk-benign";
  let label = "LOW RISK";

  if (attack === "DDoS" || attack.includes("DoS")) {
    riskClass = "risk-critical";
    label = "CRITICAL RISK";
  } else if (attack === "PortScan" || attack.includes("Patator") || attack.includes("Infiltration")) {
    riskClass = "risk-high";
    label = "HIGH RISK";
  } else if (attack === "BENIGN") {
    riskClass = "risk-benign";
    label = "BENIGN";
  } else {
    riskClass = "risk-medium";
    label = "ELEVATED";
  }

  return (
    <div className={`risk-indicator ${riskClass}`}>
      <span className="risk-indicator-dot"></span>
      <span className="risk-indicator-text">{label}</span>
      {confidence != null && (
        <span className="risk-indicator-conf">({(confidence * 100).toFixed(0)}%)</span>
      )}
    </div>
  );
}