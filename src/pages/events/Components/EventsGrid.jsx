import React from "react";
import EventCard from "./EventCard";
import "./EventsGrid.css";
import museum from "../../../assets/images/museum-photo.webp"
import crafts from "../../../assets/images/crafts.jpg"
import  nile  from "../../../assets/images/7NightsNileCruise-LuxorAswanLuxor.jpg"
import redsea from "../../../assets/images/red-sea.jpg"
import soundshow from "../../../assets/images/soundshow.jpg"
import food from "../../../assets/images/food.jpg"

// Sample events data - in real app this would come from API
const sampleEvents = [
  {
    id: 1,
    title: "Grand Egyptian Museum Grand Opening",
    type: "Cultural",
    city: "Giza",
    date: "2024-11-01",
    price: "Free",
    image: museum,
    description: "Official grand opening of the world's largest archaeological museum",
    featured: true
  },
  {
    id: 2,
    title: "Nile Music Festival",
    type: "Concerts",
    city: "Luxor",
    date: "2024-03-20",
    price: "150 EGP",
    image: nile,
    description: "Traditional Egyptian music on the banks of the Nile"
  },
  {
    id: 3,
    title: "Red Sea Diving Competition",
    type: "Sports",
    city: "Hurghada",
    date: "2024-04-15",
    price: "300 EGP",
    image: redsea,
    description: "International diving competition in the Red Sea"
  },
  {
    id: 4,
    title: "Traditional Crafts Workshop",
    type: "Workshops",
    city: "Cairo",
    date: "2024-03-25",
    price: "200 EGP",
    image: crafts,
    description: "Learn ancient Egyptian crafts from master artisans"
  },
  {
    id: 5,
    title: "Sound and Light Show at Pyramids",
    type: "Entertainment",
    city: "Giza",
    date: "2024-03-18",
    price: "100 EGP",
    image: soundshow,
    description: "Spectacular light show at the Giza Pyramids"
  },
  {
    id: 6,
    title: "Egyptian Food Festival",
    type: "Festivals",
    city: "Alexandria",
    date: "2024-04-05",
    price: "Free",
    image: food,
    description: "Taste authentic Egyptian cuisine from all regions"
  }
];

export default function EventsGrid({ filters, activeTab }) {
  // Filter events based on active filters
  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = !filters.search || 
      event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCity = !filters.city || event.city === filters.city;
    const matchesType = !filters.type || event.type === filters.type;
    
    return matchesSearch && matchesCity && matchesType;
  });

  if (filteredEvents.length === 0) {
    return (
      <div className="no-events">
        <h3>No events found</h3>
        <p>Try adjusting your filters to see more results</p>
      </div>
    );
  }

  return (
    <div className="events-grid">
      {filteredEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}