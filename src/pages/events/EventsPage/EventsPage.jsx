import React, { useState } from "react";
import Navbar from "../../landingpage/navbar/Navbar.jsx";
import Footer from "../../landingpage/footer/Footer.jsx";
import EventsHero from "../Components/EventsHero.jsx";
import EventsFilter from "../Components/EventsFilter.jsx";
import EventsGrid from "../Components/EventsGrid.jsx";
import EventsCalendar from "../Components/EventsCalendar.jsx";
import EventsMap from "../maps/EventsMap.jsx"

import "./EventsPage.css";

export default function EventsPage() {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    type: "",
    date: ""
  });

  const [activeTab, setActiveTab] = useState("upcoming");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="events-page">
      <Navbar />
      
      <main className="events-main">
        <EventsHero />
        
        <section className="events-content">
          <div className="events-container">
            <EventsFilter 
              filters={filters}
              onFilterChange={handleFilterChange}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <EventsMap/>
            <EventsGrid 
              filters={filters}
              activeTab={activeTab}
            />
          
            <EventsCalendar />
            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
