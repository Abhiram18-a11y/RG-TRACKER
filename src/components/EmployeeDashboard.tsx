import { useContext } from "react";
import { GateContext } from "./GateContext/GateContext"; // ✅ adjust if needed
import type { Gate } from "./GateContext/GateContext";
import "./EmployeeDashboard.css";

interface EmployeeDashboardProps {
  onLogout: () => void;
}

export default function EmployeeDashboard({ onLogout }: EmployeeDashboardProps) {
  const gateCtx = useContext(GateContext);

  if (!gateCtx) {
    return <div>Error: GateContext not found. Wrap app with GateProvider.</div>;
  }

  const { gates, updateGateStatus } = gateCtx;

  return (
    <div className="employee-dashboard">
      {/* 🔥 Logout Button */}
      <button className="logout-btn" onClick={onLogout}>
        🚪 Logout
      </button>

      <h2>👷 Employee Dashboard</h2>
      <p>Manage and update railway gate statuses below:</p>

      <table className="gate-table">
        <thead>
          <tr>
            <th>Gate Name</th>
            <th>Location</th>
            <th>Current Status</th>
            <th>Last Updated</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {gates.map((gate: Gate) => (
            <tr key={gate.id}>
              <td>{gate.name}</td>
              <td>{gate.location}</td>
              <td>
                <span className={`status-pill ${gate.status}`}>
                  {gate.status.toUpperCase()}
                </span>
              </td>
              <td>{gate.lastUpdated}</td>
              <td>
                <select
                  value={gate.status}
                  onChange={(e) =>
                    updateGateStatus(gate.id, e.target.value as Gate["status"])
                  }
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="busy">Busy</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
