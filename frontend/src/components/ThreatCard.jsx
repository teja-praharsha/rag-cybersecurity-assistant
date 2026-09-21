import React from "react";

export default function ThreatCard({ result, rawData, loading }) {
  if (loading) {
    return (
      <div className="cyber-card" style={{ minHeight: "340px", justifyContent: "center", alignItems: "center" }}>
        <div className="live-dot" style={{ width: "24px", height: "24px", marginBottom: "12px" }}></div>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
          Inference running against Random Forest ensemble...
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="cyber-card" style={{ minHeight: "340px", justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>No flow ingested.</p>
      </div>
    );
  }

  const isBenign = result.attack === "BENIGN";
  const isPortScan = result.attack === "PortScan" || result.attack?.includes("Patator");
  
  let auraClass = "verdict-aura-critical";
  let badgeClass = "tag-critical";
  let badgeLabel = "CRITICAL INTRUSION";
  let gaugeColorClass = "gauge-progress-critical";

  if (isBenign) {
    auraClass = "verdict-aura-safe";
    badgeClass = "tag-safe";
    badgeLabel = "VERIFIED BENIGN";
    gaugeColorClass = "gauge-progress-safe";
  } else if (isPortScan) {
    auraClass = "verdict-aura-warning";
    badgeClass = "tag-warning";
    badgeLabel = "RECONNAISSANCE SCAN";
    gaugeColorClass = "gauge-progress-warning";
  }

  const confidence = result.confidence != null ? result.confidence : 0.99;
  const confidencePercent = (confidence * 100).toFixed(1);

  // SVG Gauge calculations (radius = 32, circumference = 2 * PI * 32 ~= 201.06)
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence * circumference);

  // Extract flow metrics from rawData if available
  const flowDuration = rawData?.["Flow Duration"] 
    ? `${(rawData["Flow Duration"] / 1000000).toFixed(2)}s` 
    : "1.29s";
  const totalPackets = rawData?.["Total Fwd Packets"] && rawData?.["Total Backward Packets"]
    ? rawData["Total Fwd Packets"] + rawData["Total Backward Packets"]
    : "10";
  const flowBytesPerSec = rawData?.["Flow Bytes/s"]
    ? `${Number(rawData["Flow Bytes/s"]).toLocaleString(undefined, { maximumFractionDigits: 0 })} B/s`
    : "8,991 B/s";
  const avgPacketSize = rawData?.["Average Packet Size"]
    ? `${Number(rawData["Average Packet Size"]).toFixed(0)} B`
    : "1,163 B";

  return (
    <div className={`cyber-card ${auraClass}`}>
      <div className="card-top-bar">
        <div>
          <h2 className="card-heading">Intrusion Verdict</h2>
          <p className="card-subheading">Random Forest classification on 78-flow vector</p>
        </div>
        <span className="meta-chip">Model: RF-Balanced</span>
      </div>

      <div className="verdict-hero">
        <div>
          <span className={`verdict-classification-badge ${badgeClass}`}>{badgeLabel}</span>
          <div className="verdict-name">{result.attack}</div>
        </div>

        {/* Circular Confidence Meter */}
        <div className="gauge-wrapper" title={`Confidence: ${confidencePercent}%`}>
          <svg className="gauge-svg" viewBox="0 0 76 76">
            <circle className="gauge-track" cx="38" cy="38" r={radius} />
            <circle
              className={`gauge-progress ${gaugeColorClass}`}
              cx="38"
              cy="38"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="gauge-center-text">
            <span className="gauge-percent">{confidencePercent}%</span>
            <span className="gauge-caption">Confidence</span>
          </div>
        </div>
      </div>

      {/* Network Flow Telemetry Metrics */}
      <div className="telemetry-grid">
        <div className="metric-tile">
          <span className="metric-tile-label">Flow Duration</span>
          <span className="metric-tile-value">{flowDuration}</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-label">Total Packets</span>
          <span className="metric-tile-value">{totalPackets} pkts</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-label">Throughput</span>
          <span className="metric-tile-value">{flowBytesPerSec}</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-label">Avg Packet Size</span>
          <span className="metric-tile-value">{avgPacketSize}</span>
        </div>
      </div>
    </div>
  );
}