import React from "react";
import "./EventsFilter.css";

export default function EventsFilter({ filters, onFilterChange, activeTab, onTabChange }) {
  const cities = ["All Cities", "Cairo", "Giza", "Alexandria", "Luxor", "Aswan", "Hurghada", "Sharm El Sheikh"];
  const eventTypes = ["All Events", "Cultural", "Entertainment", "Sports", "Festivals", "Exhibitions", "Concerts", "Workshops"];

  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleCityChange = (e) => {
    onFilterChange({ ...filters, city: e.target.value === "All Cities" ? "" : e.target.value });
  };

  const handleTypeChange = (e) => {
    onFilterChange({ ...filters, type: e.target.value === "All Events" ? "" : e.target.value });
  };

  return (
    <div className="events-filter">
      {/* Tabs */}
      <div className="filter-tabs">
        <button 
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => onTabChange('upcoming')}
        >
          🗓️ Upcoming Events
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => onTabChange('ongoing')}
        >
          🔴 Happening Now
        </button>
        <button 
          className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => onTabChange('past')}
        >
          📸 Past Events
        </button>
      </div>

      {/* Filters */}
      <div className="filter-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-group">
          <select 
            value={filters.city || "All Cities"} 
            onChange={handleCityChange}
            className="filter-select"
          >
            {cities.map(city => (
              <option key={city} value={city}>📍 {city}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select 
            value={filters.type || "All Events"} 
            onChange={handleTypeChange}
            className="filter-select"
          >
            {eventTypes.map(type => (
              <option key={type} value={type}>🎪 {type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <input
            type="date"
            value={filters.date}
            onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
            className="filter-select"
          />
        </div>
      </div>
    </div>
  );
}