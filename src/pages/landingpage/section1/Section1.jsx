import React from "react";
import { HashLink } from 'react-router-hash-link';
import "./Section1.css";
import statueImg from "../../../assets/Adobe Express - file (1).png";

export default function Section1() {
  const handleScrollToMap = () => {
    const mapSection = document.getElementById("map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Map section not found");
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        {/* Left Text Side */}
        <div className="hero-text">
          <h1 className="hero-title">
            Where <span>Ancient Wonders</span> Meet Modern Discovery
          </h1>
          <p className="hero-subtitle">
            Step into a world where pharaohs once walked and legends were born. 
            From the mighty pyramids to the mystical Nile, experience Egypt's timeless 
            magic through immersive journeys that bring 5,000 years of history to life.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Years of History</span>
            </div>
            <div className="stat">
              <span className="stat-number">7</span>
              <span className="stat-label">World Wonders</span>
            </div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Stories to Discover</span>
            </div>
          </div>
          <div className="hero-buttons">
            <HashLink 
              to="#attractions" 
              className="hero-btn primary"
              scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Begin Your Journey
            </HashLink>
          </div>
        </div>

        {/* Right Image Side */}
        <div className="hero-image-wrapper">
          <img 
            src={statueImg} 
            alt="Ancient Egyptian Statue" 
            className="hero-image" 
            onError={(e) => {
              e.target.style.display = 'none';
              console.log("Image failed to load");
            }}
          />
          <div className="gold-glow"></div>
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
        </div>
      </div>
    </section>
  );
}