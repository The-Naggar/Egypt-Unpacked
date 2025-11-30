import React, { useState } from "react";
import { useCart } from '../../../hooks/useCart';
import "./EventCard.css";

export default function EventCard({ event }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleBookClick = () => {
    // Debug: Check what the event.price actually contains
    console.log('Event price:', event.price);
    console.log('Event price type:', typeof event.price);
    
    let price = 0;
    
    if (typeof event.price === 'number') {
      // If price is already a number
      price = event.price;
    } else if (typeof event.price === 'string') {
      // If price is a string, extract numbers
      const priceMatch = event.price.match(/(\d+)/);
      if (priceMatch) {
        price = parseInt(priceMatch[1]);
      } else {
        // If no numbers found, try to parse the whole string
        price = parseInt(event.price) || 0;
      }
    }
    
    // Final fallback - if still 0, set a default price
    if (price === 0) {
      price = 100; // Default price for events
      console.warn('Price was 0, using default:', price);
    }
    
    console.log('Final price:', price);
    
    // Add to cart using Redux
    addItem({
      id: `event-${event.id}`,
      type: 'event',
      name: event.title,
      price: price,
      location: event.city,
      date: event.date,
      quantity: 1
    });

    // Show success message
    alert(`✅ ${event.title} added to cart! Price: ${price} EGP`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getEventIcon = (type) => {
    const icons = {
      'Cultural': '🏛️',
      'Concerts': '🎵',
      'Sports': '⚽',
      'Workshops': '🔨',
      'Entertainment': '🎭',
      'Festivals': '🎪',
      'Exhibitions': '🖼️'
    };
    return icons[type] || '🎪';
  };

  return (
    <div 
      className={`event-card ${event.featured ? 'featured' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {event.featured && <div className="featured-badge">Featured</div>}
      
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <div className="event-type">
          {getEventIcon(event.type)} {event.type}
        </div>
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>
        
        <div className="event-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{event.city}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📅</span>
            <span className="detail-text">{formatDate(event.date)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💰</span>
            <span className="detail-text">{event.price}</span>
          </div>
        </div>

        <button className="book-btn" onClick={handleBookClick}>
          <span>Add to Cart</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}