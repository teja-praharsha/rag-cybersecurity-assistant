import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FlowControls from "../components/FlowControls";
import ThreatCard from "../components/ThreatCard";
import FeatureImportance from "../components/FeatureImportance";
import RecommendationPanel from "../components/RecommendationPanel";
import KnowledgeSearch from "../components/KnowledgeSearch";
import FlowInspectorModal from "../components/FlowInspectorModal";
import { analyzeDemo, fetchHealth } from "../services/api";

export default function Dashboard() {
  const [health, setHealth] = useState(null);
  const [activeLabel, setActiveLabel] = useState("DDoS");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [rawFlowData, setRawFlowData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Ingest demo flow
  const ingestFlow = async (label) => {
    setActiveLabel(label);
    setLoading(true);
    try {
      const data = await analyzeDemo(label);
      setAnalysisResult(data);
      // Construct approximate or known flow metrics
      if (label === "DDoS") {
        setRawFlowData({
          "Destination Port": 80,
          "Flow Duration": 1293792,
          "Total Fwd Packets": 3,
          "Total Backward Packets": 7,
          "Flow Bytes/s": 8991.39,
          "Average Packet Size": 1163.3,
        });
      } else if (label === "PortScan") {
        setRawFlowData({
          "Destination Port": 443,
          "Flow Duration": 3120,
          "Total Fwd Packets": 2,
          "Total Backward Packets": 1,
          "Flow Bytes/s": 38461.5,
          "Average Packet Size": 40.0,
        });
      } else {
        setRawFlowData({
          "Destination Port": 443,
          "Flow Duration": 5892100,
          "Total Fwd Packets": 18,
          "Total Backward Packets": 22,
          "Flow Bytes/s": 4210.8,
          "Average Packet Size": 512.4,
        });
      }
    } catch (err) {
      console.error("Ingestion failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchHealth()
      .then((h) => setHealth(h))
      .catch((err) => console.warn("Backend connectivity notice:", err));

    ingestFlow("DDoS");
  }, []);

  // Keyboard shortcuts [1], [2], [3]
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

      if (e.key === "1") ingestFlow("DDoS");
      if (e.key === "2") ingestFlow("PortScan");
      if (e.key === "3") ingestFlow("BENIGN");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleApplyCustomResult = (result, features) => {
    setAnalysisResult(result);
    setRawFlowData(features);
    setActiveLabel("Custom Vector");
  };

  return (
    <div className="app-shell">
      {/* Header */}
      <Header health={health} />

      {/* Command Bar */}
      <FlowControls
        activeLabel={activeLabel}
        onSelectDemo={ingestFlow}
        onOpenInspector={() => setIsInspectorOpen(true)}
        loading={loading}
      />

      {/* 3-Column Workstation Grid */}
      <main className="workstation-grid">
        {/* Column 1: Verdict & Metrics */}
        <ThreatCard
          result={analysisResult}
          rawData={rawFlowData}
          loading={loading}
        />

        {/* Column 2: XAI Feature Attribution Bars */}
        <FeatureImportance items={analysisResult?.explanation} />

        {/* Column 3: Playbook Triage Checklist & RAG Citations */}
        <RecommendationPanel
          guidance={analysisResult?.guidance}
          sources={analysisResult?.sources}
        />
      </main>

      {/* Section 4: Full-Width Knowledge Base RAG Explorer */}
      <KnowledgeSearch />

      {/* Custom Flow Inspector & Simulator Drawer */}
      <FlowInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        flowData={rawFlowData}
        onApplyCustomResult={handleApplyCustomResult}
      />

      {/* Footer */}
      <footer className="app-footer">
        <p>
          RAG Defense OS • Explainable AI Security Telemetry &amp; Local Knowledge Advisory Console
        </p>
        <p className="app-footer-sub">
          Model predictions serve as decision support and must be cross-referenced with production endpoint telemetry.
        </p>
      </footer>
    </div>
  );
}