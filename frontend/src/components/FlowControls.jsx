import React from "react";

export default function FlowControls({ activeLabel, onSelectDemo, onOpenInspector, loading }) {
  const flows = [
    {
      id: "DDoS",
      key: "1",
      name: "DDoS Flood Flow",
      tag: "Critical",
      tagClass: "tag-critical",
      hint: "High-volume SYN flood pattern with port 80 target",
    },
    {
      id: "PortScan",
      key: "2",
      name: "PortScan Probing",
      tag: "Recon",
      tagClass: "tag-warning",
      hint: "Rapid sequential port probing and banner discovery",
    },
    {
      id: "BENIGN",
      key: "3",
      name: "Clean Benign Flow",
      tag: "Safe",
      tagClass: "tag-safe",
      hint: "Standard enterprise HTTPS flow with normal IAT timing",
    },
  ];

  return (
    <div className="command-bar" role="toolbar" aria-label="Ingestion Command Bar">
      <div className="command-bar-left">
        <span className="command-bar-label">Ingest Flow</span>
        <div className="flow-pills-group">
          {flows.map((flow) => {
            const isActive = activeLabel === flow.id;
            return (
              <button
                key={flow.id}
                type="button"
                className={`flow-select-pill ${isActive ? "active-pill" : ""}`}
                onClick={() => onSelectDemo(flow.id)}
                disabled={loading}
                title={`${flow.hint} (Press ${flow.key})`}
              >
                <span className="flow-key-tag">[{flow.key}]</span>
                <span className="flow-pill-name">{flow.name}</span>
                <span className={`flow-pill-tag ${flow.tagClass}`}>{flow.tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="command-bar-right">
        <button
          type="button"
          className="btn-ghost-cyan"
          onClick={onOpenInspector}
          title="Inspect and live-edit the 78 CIC-IDS2017 flow metrics"
        >
          <span>⚙️ Inspect / Simulate Flow</span>
        </button>
      </div>
    </div>
  );
}
