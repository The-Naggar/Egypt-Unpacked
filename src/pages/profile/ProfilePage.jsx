import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

import giza from "../../assets/giza.jpg";
import karnak from "../../assets/karnak temple.png";
import abu from "../../assets/abu-simple-temple-in-aswan_zLkWb.jpeg";
import citadel from "../../assets/Salah El din citadel_71cb2_lg.jpg";
import nile from "../../assets/photo-1606036685180-d6187349ab23.jpg";
import cairo from "../../assets/photo-1502250663587-0437415428a2.jpg";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("visited");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sample data - in a real app, this would come from props or API
  const userData = {
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    joinDate: "January 2023",
    avatar: "/api/placeholder/150/150", // Placeholder for user photo
    totalVisits: 12,
    favoriteDestinations: 8
  };

  const visitedPlaces = [
    {
      id: 1,
      name: "Great Pyramid of Giza",
      location: "Giza, Egypt",
      visitDate: "March 15, 2024",
      image: giza,
      rating: 5,
      review: "Absolutely magnificent! The sheer size and history took my breath away."
    },
    {
      id: 2,
      name: "Karnak Temple Complex",
      location: "Luxor, Egypt",
      visitDate: "February 28, 2024",
      image: karnak,
      rating: 5,
      review: "Incredible tombs and hieroglyphs. A must-visit for history lovers."
    },
    {
      id: 3,
      name: "Abu Simbel Temples",
      location: "Aswan, Egypt",
      visitDate: "February 27, 2024",
      image: abu,
      rating: 4,
      review: "Massive temple complex with stunning architecture and history."
    },
    {
      id: 4,
      name: "Citadel of Saladin",
      location: "Cairo, Egypt",
      visitDate: "January 20, 2024",
      image: citadel,
      rating: 5,
      review: "The relocation of these temples is an engineering marvel!"
    }
  ];

  const interestedPlaces = [
    {
      id: 5,
      name: "The Nile River",
      location: "Egypt",
      image: nile,
      addedDate: "March 20, 2024"
    },
    {
      id: 6,
      name: "Old Cairo",
      location: "Cairo, Egypt",
      image: cairo,
      addedDate: "March 18, 2024"
    },
    {
      id: 7,
      name: "Luxor Temple",
      location: "Luxor, Egypt",
      image: karnak,
      addedDate: "March 15, 2024"
    },
    {
      id: 8,
      name: "Sphinx & Pyramid Complex",
      location: "Giza, Egypt",
      image: giza,
      addedDate: "March 10, 2024"
    }
  ];

  return (
    <div className="profile-page">
      {/* Back to Home Button */}
      <Link to="/" className="back-home-btn">
        <span className="arrow">←</span>
        Back to Home
      </Link>

      <div className="profile-container">
        {/* Profile Hero Section */}
        <header className="profile-hero">
          <h1 className="profile-hero-title">Your Egyptian Journey</h1>
          <p className="profile-hero-subtitle">Discover your travel history and plan your next adventure</p>
          <div className="profile-hero-divider"></div>
        </header>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img src={userData.avatar} alt="Profile" className="avatar-img" />
              <button className="edit-avatar-btn">
                <span className="edit-icon">✏️</span>
              </button>
            </div>
          </div>

          <div className="profile-info">
            <h1 className="profile-name">{userData.name}</h1>
            <p className="profile-email">{userData.email}</p>
            <p className="profile-join-date">Member since {userData.joinDate}</p>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{userData.totalVisits}</span>
                <span className="stat-label">Places Visited</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userData.favoriteDestinations}</span>
                <span className="stat-label">Favorites</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "visited" ? "active" : ""}`}
            onClick={() => setActiveTab("visited")}
          >
            Places Visited
          </button>
          <button
            className={`tab-btn ${activeTab === "interested" ? "active" : ""}`}
            onClick={() => setActiveTab("interested")}
          >
            Places of Interest
          </button>
        </div>

        {/* Content Sections */}
        <div className="profile-content">
          {activeTab === "visited" && (
            <div className="visited-places">
              <h2 className="section-title">Places You've Visited</h2>
              <div className="places-grid">
                {visitedPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="place-card visited-card"
                    onMouseEnter={() => setHoveredCard(place.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="place-image">
                      <img src={place.image} alt={place.name} />
                      <div className="visit-badge">✓ Visited</div>
                    </div>
                    <div className="place-info">
                      <h3 className="place-name">{place.name}</h3>
                      <p className="place-location">{place.location}</p>
                      <p className="visit-date">Visited: {place.visitDate}</p>
                      <div className="place-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < place.rating ? "filled" : ""}`}>★</span>
                        ))}
                      </div>
                      <p className="place-review">{place.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "interested" && (
            <div className="interested-places">
              <h2 className="section-title">Places of Interest</h2>
              <div className="places-grid">
                {interestedPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="place-card interested-card"
                    onMouseEnter={() => setHoveredCard(place.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="place-image">
                      <img src={place.image} alt={place.name} />
                      <div className="interest-badge">♡ Interested</div>
                    </div>
                    <div className="place-info">
                      <h3 className="place-name">{place.name}</h3>
                      <p className="place-location">{place.location}</p>
                      <p className="added-date">Added: {place.addedDate}</p>
                      <div className="place-actions">
                        <button className="action-btn primary">Plan Visit</button>
                        <button className="action-btn secondary">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

