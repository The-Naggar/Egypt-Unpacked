import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventsMap.css";

export default function EventsMap() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    { 
      id: 1, name: "Cairo", x: 52, y: 32,
      events: [
        { name:"Museum Opening", date:"2025-12-25", location:"Downtown Cairo", desc:"Grand opening of the Egyptian Museum", details:"The museum features over 120,000 ancient artifacts including mummies and golden treasures. Expected visitors: 5000+." },
        { name:"Cultural Festival", date:"2025-12-28", location:"Zamalek", desc:"Arts and music festival", details:"A celebration of Egyptian culture with live music, art exhibitions, and traditional dance performances. Estimated attendance: 3000." },
        { name:"Food Tour", date:"2026-01-05", location:"Old Cairo", desc:"Explore Cairo's traditional dishes", details:"Guided tour of Cairo's famous food spots including local markets and street food stalls. Participants: 50 per tour." }
      ]
    },
    { 
      id: 2, name: "Alexandria", x: 40, y: 22,
      events: [
        { name:"Beach Festival", date:"2025-12-30", location:"Montaza Beach", desc:"Fun beach activities and concerts", details:"Enjoy beach games, live concerts, and seafood stalls. Visitors expected: 2000+." },
        { name:"Historical Tour", date:"2026-01-02", location:"Alexandria Library", desc:"Guided historical city tour", details:"Tour of Alexandria's landmarks including the library and fort. Group size: 30 people per guide." },
        { name:"Music Night", date:"2026-01-10", location:"Corniche", desc:"Open air music performances", details:"Evening music festival along the Corniche featuring local bands. Estimated attendance: 1500." }
      ]
    },
    { 
      id: 3, name: "Luxor", x: 55, y: 60,
      events: [
        { name:"Temple Tour", date:"2025-12-20", location:"Karnak Temple", desc:"Explore ancient temples", details:"Guided tour of Karnak and Luxor Temples. Visitors expected: 800 per day." },
        { name:"Nile Cruise", date:"2026-01-03", location:"Nile River", desc:"Evening cruise on the Nile", details:"Enjoy a scenic cruise with dinner and live music. Participants: 100 per cruise." },
        { name:"Sound & Light Show", date:"2026-01-07", location:"Luxor Temple", desc:"Spectacular night show", details:"Light and sound show narrating history of Luxor. Attendance: ~500 per show." }
      ]
    },
    { 
      id: 4, name: "Aswan", x: 60, y: 75,
      events: [
        { name:"Nubian Village", date:"2025-12-27", location:"Nubian Village", desc:"Experience local culture", details:"Cultural tours, handicrafts, and traditional dances. Visitors expected: 400 per tour." },
        { name:"Philae Temple", date:"2026-01-04", location:"Philae Island", desc:"Visit the beautiful temple", details:"Guided tours of Philae Temple. Participants: 300 per tour." },
        { name:"Felucca Ride", date:"2026-01-09", location:"Nile River", desc:"Relaxing sail on the river", details:"Traditional felucca rides on Nile. 8-10 people per boat." }
      ]
    },
    { 
      id: 5, name: "Hurghada", x: 75, y: 50,
      events: [
        { name:"Diving Competition", date:"2026-01-01", location:"Red Sea", desc:"Underwater diving competition", details:"Professional and amateur divers participate. Audience: 2000+." },
        { name:"Beach Party", date:"2026-01-06", location:"Soma Bay", desc:"Music and beach games", details:"Day-long beach party with DJs and games. Visitors: 1000+." },
        { name:"Marine Tour", date:"2026-01-12", location:"Red Sea", desc:"Explore marine life", details:"Snorkeling and marine tours for groups of 20." }
      ]
    },
    { 
      id: 6, name: "Sharm El Sheikh", x: 85, y: 45,
      events: [
        { name:"Snorkeling", date:"2025-12-29", location:"Ras Mohammed", desc:"Discover coral reefs", details:"Snorkeling sessions with guides. Max 15 participants per session." },
        { name:"Desert Safari", date:"2026-01-08", location:"Sinai Desert", desc:"Adventure in the desert", details:"4x4 desert safari, camel rides, Bedouin camp. Groups up to 20 people." },
        { name:"Resort Events", date:"2026-01-15", location:"Hotel Resorts", desc:"Enjoy resort activities", details:"Pool parties, themed nights, and kids activities. Attendance: variable." }
      ]
    }
  ];

  return (
    <section className="map-wrapper">
      <h2 className="map-title">🗺️ Explore Egypt</h2>

      <div className="map-box">
        <svg viewBox="0 0 800 800" className="egypt-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mapGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A4C4A" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#04605C" stopOpacity="0.8"/>
            </linearGradient>
            <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.3"/>
            </filter>
          </defs>
          <path
            fill="url(#mapGradient)"
            stroke="#BC914C"
            strokeWidth="4"
            filter="url(#mapShadow)"
            d="M88 155 L720 140 L760 300 L690 520 L500 680 L260 640 L120 520 L60 260 Z"
          />
        </svg>

        {cities.map(city => (
          <button
            key={city.id}
            className={`map-pin ${selectedCity?.id === city.id ? "active" : ""}`}
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
            onClick={() => setSelectedCity(city)}
          >
            📍
            <span className="pin-label">{city.name}</span>
          </button>
        ))}
      </div>

      <div className={`city-details ${selectedCity ? "show" : ""}`}>
        {selectedCity && (
          <div className="city-info">
            <h3>{selectedCity.name}</h3>
            <div className="events-count">{selectedCity.events.length} Events Available</div>
            <div className="events-list">
              <h4>Popular Events:</h4>
              <ul>
                {selectedCity.events.map((ev, i) => (
                  <li key={i}>• {ev.name}</li>
                ))}
              </ul>
            </div>
            <button
  className="view-events-btn"
  onClick={() =>
    navigate(`/events/city/${selectedCity.name.toLowerCase().replace(/ /g, "-")}`)
  }
>
  Explore {selectedCity.name}
</button>

          </div>
        )}
      </div>
    </section>
  );
}
