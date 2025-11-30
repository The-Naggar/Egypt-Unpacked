import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../landingpage/navbar/Navbar.jsx";
import Footer from "../landingpage/footer/Footer.jsx";
import { useCart } from '../../hooks/useCart'; // Import the cart hook
import './CitadelPage.css';

// استيراد الصور مباشرة - تحتاجين لاستبدالها بالصور الفعلية
import citadel1 from "../../assets/Citadel-Egypt.png";
import citadel2 from "../../assets/Mohammed_Ali_Mosque.jpg";
import citadel3 from "../../assets/egyptiangeographic.com_1514402798_1.jpeg";
import citadel4 from "../../assets/Flickr_-_Gaspa_-_Cairo,_museo_militare_.jpg";

const SaladinCitadelPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart(); // Get addItem function from cart hook

  const citadelSlides = [
    {
      id: 1,
      title: "The Main Entrance Gate",
      description: "Massive Stone Gateway - Historic Entrance to the Citadel",
      image: citadel1
    },
    {
      id: 2,
      title: "Muhammad Ali Mosque", 
      description: "The Alabaster Mosque - Ottoman Architecture Masterpiece",
      image: citadel2
    },
    {
      id: 3,
      title: "The Northern Walls",
      description: "Fortified Stone Walls - Panoramic Views of Cairo",
      image: citadel3
    },
    {
      id: 4,
      title: "Military Museum",
      description: "Historical Weapons and Armor - Egyptian Military History",
      image: citadel4
    }
  ];

  const ticketTypes = [
    {
      id: 1,
      type: "General Admission",
      price: "150 EGP",
      features: [
        "Access to Citadel grounds",
        "Entry to Muhammad Ali Mosque",
        "Self-guided tour",
        "View of Cairo panorama",
        "Valid for one day"
      ]
    },
    {
      id: 2,
      type: "Guided Experience",
      price: "300 EGP",
      features: [
        "Access to Citadel grounds",
        "Professional guided tour (2 hours)",
        "Entry to all open monuments",
        "Historical explanations",
        "Military Museum access",
        "Gawhara Palace visit"
      ]
    },
    {
      id: 3,
      type: "Premium Full Access",
      price: "500 EGP",
      features: [
        "All Guided Experience features",
        "Extended guided tour (3 hours)",
        "Access to restricted areas",
        "Egyptologist expert guide",
        "Photography permission",
        "Traditional refreshments",
        "Priority access"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % citadelSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [citadelSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % citadelSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + citadelSlides.length) % citadelSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleBookTicket = (ticket) => {
    // Extract numeric price from string (remove " EGP")
    const price = parseInt(ticket.price.replace(' EGP', ''));
    
    // Add to cart using Redux
    addItem({
      id: `citadel-${ticket.id}`, // Unique ID for this attraction + ticket type
      type: 'attraction',
      name: `Saladin Citadel - ${ticket.type}`,
      price: price,
      location: 'Cairo Citadel',
      quantity: 1
    });

    // Optional: Show success message or navigate to cart
    alert(`✅ ${ticket.type} added to cart!`);
    
    // Optional: Navigate to tickets page
    // navigate('/tickets');
  };

  return (
    <div className="saladin-citadel-page">
      <Navbar />
      
      {/* الكاروسيل */}
      <div className="citadel-carousel">
        {citadelSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url(${slide.image})`
            }}
          >
            <div className="slide-content">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
        
        <button className="carousel-btn prev-btn" onClick={prevSlide}>
          ❮
        </button>
        
        <button className="carousel-btn next-btn" onClick={nextSlide}>
          ❯
        </button>
        
        <div className="carousel-dots">
          {citadelSlides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* المحتوى الرئيسي - قسمين جنب بعض */}
      <div className="main-content">
        {/* قسم التذاكر */}
        <div className="tickets-section">
          <h2>Ticket Packages</h2>
          <div className="ticket-types">
            {ticketTypes.map((ticket) => (
              <div key={ticket.id} className="ticket-type">
                <div className="ticket-header">
                  <h3>{ticket.type}</h3>
                  <span className="ticket-price">{ticket.price}</span>
                </div>
                <ul className="ticket-features">
                  {ticket.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button 
                  className="book-btn"
                  onClick={() => handleBookTicket(ticket)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* قسم معلومات القلعة */}
        <div className="citadel-info">
          <h2>Salah El-Din Citadel</h2>
          <div className="info-content">
            <div className="info-card">
              <h3>Historic Fortification</h3>
              <p>
                Built between 1176 and 1183 AD by Salah El-Din (Saladin) to protect Cairo 
                from Crusader attacks, the citadel served as the seat of government for 
                Egypt for nearly 700 years. Its strategic location on the Mokattam Hills 
                provided a commanding view of the city and surrounding areas.
              </p>
            </div>

            <div className="info-card">
              <h3>Muhammad Ali Mosque</h3>
              <p>
                The iconic Ottoman-style mosque, also known as the Alabaster Mosque, 
                was built between 1830 and 1848. Featuring twin minarets reaching 82 meters 
                high and a massive central dome, the mosque's interior is adorned with 
                alabaster and gold decorations, making it one of Cairo's most recognizable 
                landmarks.
              </p>
            </div>

            <div className="info-card">
              <h3>Architectural Complex</h3>
              <p>
                The citadel complex includes multiple mosques, palaces, museums, and 
                military structures. Notable buildings include the Gawhara Palace, 
                the Military Museum, the Police Museum, and the Carriage Museum. Each 
                structure represents different historical periods from the Ayyubid to 
                the Muhammad Ali dynasty.
              </p>
            </div>

            <div className="highlight">
              <h4>Panoramic Cairo Views</h4>
              <p>
                Experience breathtaking 360-degree views of Cairo from the citadel's 
                vantage point. See historic Islamic Cairo, modern downtown, and the 
                pyramids of Giza in the distance. The citadel offers a unique perspective 
                on Egypt's capital, blending ancient history with contemporary life.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SaladinCitadelPage;