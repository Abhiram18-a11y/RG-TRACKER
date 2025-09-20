import React, { useContext, useState, useEffect } from "react";
import { GateContext } from "../GateContext/GateContext";
import type { Gate } from "../GateContext/GateContext";
import {
  FaMapMarkerAlt,
  FaClock,
  FaTools,
  FaExclamationTriangle,
} from "react-icons/fa";
import ChatBot from "../chatbot/ChatBot";
import "./Dashboard.css";

const statusPillClass = (s: Gate["status"]) => `pill pill-${s}`;

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const gateCtx = useContext(GateContext);
  if (!gateCtx)
    return <div>Error: GateContext not found. Wrap your app in GateProvider.</div>;

  const { gates, generateCityGates } = gateCtx;
  const [selectedGate, setSelectedGate] = useState<Gate | null>(
    gates[0] || null
  );
  const [origin, setOrigin] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (selectedGate) {
      const updated = gates.find((g) => g.id === selectedGate.id);
      if (updated) setSelectedGate(updated);
    } else {
      if (gates.length && !selectedGate) setSelectedGate(gates[0]);
    }
  }, [gates]);

  const openAlternateRoute = (destination: string) => {
    const base = "https://www.google.com/maps/dir/?api=1";
    const params = new URLSearchParams({
      destination,
      travelmode: "driving",
    });
    if (origin.trim()) params.set("origin", origin.trim());
    window.open(`${base}&${params.toString()}`, "_blank");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    generateCityGates(searchQuery.trim());
    setSelectedGate(null);
    setSearchQuery("");
  };

  return (
    <div className="dashboard-container">
      {/* 🔥 Logout Button */}
      <button className="logout-btn" onClick={onLogout}>
        🚪 Logout
      </button>

      {/* === Left Panel === */}
      <div className="left-panel">
        <h2 className="title">⚙ Railway Gate Status</h2>
        <div className="notice">Enter your city or location below.</div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search city (e.g., Hyderabad, Mumbai)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="origin-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <input
          type="text"
          placeholder="Enter your starting location..."
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="origin-input"
        />

        {selectedGate && (
          <div className="details-panel">
            <div className="panel-header">
              <h3>{selectedGate.name}</h3>
              <span className={statusPillClass(selectedGate.status)}>
                {selectedGate.status.toUpperCase()}
              </span>
            </div>
            <p className="detail-line">
              <FaMapMarkerAlt /> {selectedGate.location}
            </p>
            <p className="detail-line">
              <FaClock /> Last updated: {selectedGate.lastUpdated}
            </p>

            {selectedGate.status === "closed" && (
              <div className="alternate-block">
                <p className="warning">
                  <FaExclamationTriangle /> Gate is currently unavailable
                </p>
                <button
                  className="alternate-btn"
                  onClick={() => openAlternateRoute(selectedGate.location)}
                >
                  Show Alternate Route
                </button>
              </div>
            )}
          </div>
        )}

        <h3 className="subtitle">Nearby Gates</h3>
        <div className="gates-grid">
          {gates.map((g) => (
            <div
              key={g.id}
              onClick={() => setSelectedGate(g)}
              className={`gate-card ${selectedGate?.id === g.id ? "active" : ""}`}
            >
              <span className={`status-dot ${g.status}`}></span>
              <div>
                <h4>{g.name}</h4>
                <p>{g.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === Right Panel === */}
      <div className="right-panel">
        <div className="stats-card">
          <h3 className="stats-title">📊 Live Statistics</h3>
          <ul>
            <li>
              <span className="dot dot-open"></span> Open Gates{" "}
              <b>{gates.filter((g) => g.status === "open").length}</b>
            </li>
            <li>
              <span className="dot dot-busy"></span> Busy{" "}
              <b>{gates.filter((g) => g.status === "busy").length}</b>
            </li>
            <li>
              <span className="dot dot-closed"></span> Closed{" "}
              <b>{gates.filter((g) => g.status === "closed").length}</b>
            </li>
            <li>
              <FaTools className="inline-icon" /> Maintenance{" "}
              <b>{gates.filter((g) => g.status === "maintenance").length}</b>
            </li>
          </ul>
        </div>
      </div>

      <ChatBot />
    </div>
  );
}
