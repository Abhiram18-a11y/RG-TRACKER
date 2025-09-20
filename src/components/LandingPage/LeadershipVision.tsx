import "./LeadershipVision.css";

import railwayMinister from "../../assets/railway-minister.jpg";
import narendraModi from "../../assets/narendra-modi.jpg";
import chandrababuNaidu from "../../assets/chandrababu-naidu.jpg";

export default function LeadershipVision() {
  return (
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
  );
}
