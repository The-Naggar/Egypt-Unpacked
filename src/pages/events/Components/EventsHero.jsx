import React from "react";
import "./EventsHero.css";

export default function EventsHero() {
  return (
    <section className="events-hero">
      <div className="events-hero-content">
        <h1 className="events-title">Tourism Events in Egypt</h1>
        <p className="events-subtitle">
          Discover the most amazing events and activities that make your journey to Egypt unforgettable
        </p>
        <div className="events-divider"></div>
        
        <div className="events-stats">
          <div className="event-stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Active Events</span>
          </div>
          <div className="event-stat">
            <span className="stat-number">15</span>
            <span className="stat-label">Egyptian Cities</span>
          </div>
          <div className="event-stat">
            <span className="stat-number">10,000+</span>
            <span className="stat-label">Monthly Visitors</span>
          </div>
        </div>
      </div>
    </section>
  );
}