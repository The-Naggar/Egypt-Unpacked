import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../landingpage/navbar/Navbar.jsx";
import Footer from "../landingpage/footer/Footer.jsx";
import { useCart } from '../../hooks/useCart'; // Import the cart hook
import './GizaPage.css';

// استيراد الصور مباشرة
import pyramid1 from "../../assets/photo-1503177119275-0aa32b3a9368.avif";
import pyramid2 from "../../assets/Think-Egypt-Giza-Sphynx-178375366-pius99-copy.jpg";
import pyramid3 from "../../assets/Khafres_Pyramid343.jpg";
import pyramid4 from "../../assets/giza.jpg";

const GizaPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart(); // Get addItem function from cart hook

  const pyramidSlides = [
    {
      id: 1,
      title: "The Great Pyramid",
      description: "Wonder of the Ancient World - Built by Pharaoh Khufu",
      image: pyramid1
    },
    {
      id: 2,
      title: "The Great Sphinx", 
      description: "The Great Guardian - Embodies the Power and Wisdom of Pharaohs",
      image: pyramid2
    },
    {
      id: 3,
      title: "Khafre's Pyramid",
      description: "Middle Pyramid - Preserves Part of Its Original Casing",
      image: pyramid3
    },
    {
      id: 4,
      title: "Menkaure's Pyramid",
      description: "The Smallest Pyramid - Most Complete Construction",
      image: pyramid4
    }
  ];

  const ticketTypes = [
    {
      id: 1,
      type: "General Admission",
      price: "200 EGP",
      features: [
        "Access to Giza Plateau",
        "View of Pyramids from outside",
        "Basic guided tour",
        "Valid for one day"
      ]
    },
    {
      id: 2,
      type: "Premium Experience",
      price: "500 EGP",
      features: [
        "Access to Giza Plateau",
        "Entry inside the Great Pyramid",
        "Professional guided tour",
        "Sphinx close access",
        "Solar Boat Museum entry"
      ]
    },
    {
      id: 3,
      type: "VIP Full Day",
      price: "1000 EGP",
      features: [
        "All Premium features included",
        "Private Egyptologist guide",
        "Camel ride experience",
        "Sound & Light show ticket",
        "Lunch at panoramic restaurant",
        "Priority access lines"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % pyramidSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [pyramidSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pyramidSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pyramidSlides.length) % pyramidSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleBookTicket = (ticket) => {
    // Extract numeric price from string (remove " EGP")
    const price = parseInt(ticket.price.replace(' EGP', ''));
    
    // Add to cart using Redux
    addItem({
      id: `giza-${ticket.id}`, // Unique ID for this attraction + ticket type
      type: 'attraction',
      name: `Giza Pyramids - ${ticket.type}`,
      price: price,
      location: 'Giza Plateau',
      quantity: 1
    });

    // Optional: Show success message or navigate to cart
    alert(`✅ ${ticket.type} added to cart!`);
    
    // Optional: Navigate to tickets page
    // navigate('/tickets');
  };

  return (
    <div className="giza-page">
      <Navbar />
      
      {/* الكاروسيل */}
      <div className="pyramids-carousel">
        {pyramidSlides.map((slide, index) => (
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
          {pyramidSlides.map((_, index) => (
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

        {/* قسم معلومات الأهرامات */}
        <div className="pyramids-info">
          <h2>The Giza Pyramid Complex</h2>
          <div className="info-content">
            <div className="info-card">
              <h3>The Great Pyramid of Khufu</h3>
              <p>
                Built as a tomb for Pharaoh Khufu around 2560 BC, the Great Pyramid stood as 
                the tallest man-made structure in the world for over 3,800 years. Originally 
                standing at 146.6 meters, it was constructed using approximately 2.3 million 
                stone blocks, each weighing an average of 2.5 tons.
              </p>
            </div>

            <div className="info-card">
              <h3>Architectural Marvel</h3>
              <p>
                The precision of the pyramid's construction is astonishing - its sides are 
                aligned almost perfectly with the four cardinal directions. The interior 
                contains three main chambers and sophisticated passageways, showcasing 
                advanced engineering knowledge that continues to amaze archaeologists and 
                engineers today.
              </p>
            </div>

            <div className="info-card">
              <h3>The Great Sphinx</h3>
              <p>
                Guarding the Giza Plateau for millennia, the Great Sphinx is the world's 
                largest monolithic statue. With the body of a lion and the head of a pharaoh 
                (believed to be Khafre), this magnificent monument measures 73 meters long 
                and 20 meters high, carved directly from the bedrock of the Giza Plateau.
              </p>
            </div>

            <div className="highlight">
              <h4>Experience Ancient Wonders</h4>
              <p>
                Walk in the footsteps of pharaohs and explore one of the most iconic 
                archaeological sites on Earth. The Giza Pyramids continue to reveal 
                secrets about ancient Egyptian civilization and its remarkable achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GizaPage;