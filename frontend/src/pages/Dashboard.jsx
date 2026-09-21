import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FlowControls from "../components/FlowControls";
import ThreatCard from "../components/ThreatCard";
import FeatureImportance from "../components/FeatureImportance";
import RecommendationPanel from "../components/RecommendationPanel";
import EvidencePanel from "../components/EvidencePanel";
import KnowledgeSearch from "../components/KnowledgeSearch";
import { analyzeDemo, fetchHealth } from "../services/api";

export default function Dashboard() {
  const [health, setHealth] = useState(null);
  const [activeLabel, setActiveLabel] = useState("DDoS");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial health status and run default DDoS demo
  useEffect(() => {
    fetchHealth()
      .then((h) => setHealth(h))
      .catch((err) => console.warn("Backend not reached yet:", err));

    handleSelectDemo("DDoS");
  }, []);

  const handleSelectDemo = async (label) => {
    setActiveLabel(label);
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeDemo(label);
      setAnalysisResult(data);
    } catch (err) {
      setError(err.message || "Failed to analyze demo flow.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Header health={health} activeLabel={activeLabel} />

      <main className="dashboard-main">
        {error && (
          <div className="error-banner">
            <strong>System Notice:</strong> {error}
          </div>
        )}

        {/* Section 1: Ingestion / Demo Controls */}
        <section className="dashboard-section">
          <FlowControls
            onSelectDemo={handleSelectDemo}
            activeLabel={activeLabel}
            loading={loading}
          />
        </section>

        {/* Section 2: Threat Detection & Explainability */}
        <section className="dashboard-grid-two-col">
          <div className="col-left">
            <ThreatCard result={analysisResult} loading={loading} />
            <RecommendationPanel items={analysisResult?.guidance} />
          </div>
          <div className="col-right">
            <FeatureImportance items={analysisResult?.explanation} />
            <EvidencePanel sources={analysisResult?.sources} />
          </div>
        </section>

        {/* Section 3: RAG Knowledge Base Search */}
        <section className="dashboard-section">
          <KnowledgeSearch />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          RAG-Based Explainable AI Cybersecurity Assistant • Built with FastAPI, Scikit-Learn (CIC-IDS2017), Local TF-IDF RAG &amp; React
        </p>
        <p className="footer-sub">
          Model predictions are designed for decision support and should always be correlated with full system telemetry.
        </p>
      </footer>
    </div>
  );
}