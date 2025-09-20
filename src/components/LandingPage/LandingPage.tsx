import "./LandingPage.css";
import "./LeadershipVision.css";

// ✅ import images from src/assets
import railwayMinister from "../../assets/railway-minister.jpg";
import narendraModi from "../../assets/narendra-modi.jpg";
import chandrababuNaidu from "../../assets/chandrababu-naidu.jpg";

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="landing-page">
      {/* ===== Hero Section ===== */}
      <header className="hero">
        <div className="container">
          <h1>🚦 Smart Railway Gate Tracker</h1>
          <p>
            Real-time monitoring and intelligent route planning for safer
            railway crossings across India
          </p>
          <div className="hero-buttons">
            <button className="btn">🚉 Live Gate Status</button>
            <button className="btn">🗺️ Smart Routing</button>
            <button className="btn">🎤 Voice Assistant</button>
            <button className="btn login-btn" onClick={onLogin}>
              🔑 Login
            </button>
          </div>
        </div>
      </header>

      {/* ===== Leadership Section ===== */}
      <section className="leaders">
        <h2>Leadership & Vision</h2>
        <p>
          Committed to building a safer, smarter, and more connected
          transportation system for India
        </p>
        <div className="leader-cards">
          {/* Railway Minister */}
          <div className="leader-card">
            <img src={railwayMinister} alt="Railway Minister" />
            <h3>Railway Minister</h3>
            <p>Modernising transport for a smarter India.</p>
          </div>

          {/* Narendra Modi */}
          <div className="leader-card">
            <img src={narendraModi} alt="PM Narendra Modi" />
            <h3>Narendra Modi</h3>
            <p>Digital India. Safe India.</p>
          </div>

          {/* Chandrababu Naidu */}
          <div className="leader-card">
            <img src={chandrababuNaidu} alt="N. Chandrababu Naidu" />
            <h3>N. Chandrababu Naidu</h3>
            <p>Andhra Pradesh – Leading Innovation.</p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <p>
          © 2025 Smart Railway Gate Tracker. A Digital India Initiative. <br />
          Powered by Government of Andhra Pradesh & Indian Railways
        </p>
      </footer>
    </div>
  );
}
