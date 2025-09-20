import { useState, useEffect } from "react";
import "./App.css";

import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import { GateProvider } from "./components/GateContext/GateContext";

function App() {
  const [role, setRole] = useState<"user" | "employee" | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [debugMode, setDebugMode] = useState(false); // ✅ OFF by default

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setShowLoginModal(false);
  };

  // ✅ Ctrl+D → toggle debug mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setDebugMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <GateProvider>
      <div className="app-root">
        {/* ✅ Debug mode → always show both dashboards side by side */}
        {debugMode ? (
          <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
            <div style={{ flex: 1 }}>
              <h2>🧑‍💻 User Dashboard</h2>
              <Dashboard onLogout={handleLogout} />
            </div>
            <div style={{ flex: 1 }}>
              <h2>👷 Employee Dashboard</h2>
              <EmployeeDashboard onLogout={handleLogout} />
            </div>
          </div>
        ) : (
          <>
            {!isLoggedIn ? (
              <>
                {/* ✅ Landing page with leaders */}
                <LandingPage onLogin={() => setShowLoginModal(true)} />

                {/* ✅ Login Modal */}
                {showLoginModal && (
                  <div
                    className="modal-overlay"
                    onClick={() => {
                      setShowLoginModal(false);
                      setRole(null);
                    }}
                  >
                    <div
                      className="modal-content"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="modal-close"
                        onClick={() => {
                          setShowLoginModal(false);
                          setRole(null);
                        }}
                      >
                        ×
                      </button>

                      {!role ? (
                        <>
                          <h3>Select Login Type</h3>
                          <div className="login-buttons">
                            <button onClick={() => setRole("user")}>
                              User Login
                            </button>
                            <button onClick={() => setRole("employee")}>
                              Employee Login
                            </button>
                          </div>
                        </>
                      ) : (
                        <form onSubmit={handleLogin}>
                          {role === "employee" && (
                            <>
                              <label htmlFor="empid">Employee ID:</label>
                              <input
                                id="empid"
                                type="text"
                                placeholder="Enter Employee ID"
                                required
                              />
                            </>
                          )}
                          <label htmlFor="mobile">Mobile Number:</label>
                          <input
                            id="mobile"
                            type="text"
                            placeholder="Enter Mobile Number"
                            required
                          />
                          <label htmlFor="otp">OTP:</label>
                          <input
                            id="otp"
                            type="number"
                            placeholder="Enter OTP"
                            required
                          />
                          <button
                            type="submit"
                            className={`login-submit ${role}`}
                          >
                            Login
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : role === "user" ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <EmployeeDashboard onLogout={handleLogout} />
            )}
          </>
        )}
      </div>
    </GateProvider>
  );
}

export default App;
