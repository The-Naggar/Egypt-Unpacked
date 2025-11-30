import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../landingpage/navbar/Navbar.jsx";
import Footer from "../landingpage/footer/Footer.jsx";
import { useCart } from '../../hooks/useCart'; // Import the cart hook
import './KarnakPage.css';

// استيراد الصور مباشرة - تحتاجين لاستبدالها بالصور الفعلية
import karnak1 from "../../assets/WhatsApp Image 2025-11-20 at 08.50.51_3d4a141c.jpg";
import karnak2 from "../../assets/b02b406b5032091ff5d22d1e8e4349d516aec867.jpg";
import karnak3 from "../../assets/sacred-lake-karnak-temple-unesco-world-heritage-site-near-luxor-egypt-north-africa-africa-RHPLF02027.jpg";
import karnak4 from "../../assets/43806273890_0401446dcd_b.jpg";

const KarnakPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart(); // Get addItem function from cart hook

  const karnakSlides = [
    {
      id: 1,
      title: "The Great Hypostyle Hall",
      description: "Forest of Giant Columns - Masterpiece of Ancient Architecture",
      image: karnak1
    },
    {
      id: 2,
      title: "Temple of Amun-Ra", 
      description: "The Main Sanctuary - Heart of the Karnak Complex",
      image: karnak2
    },
    {
      id: 3,
      title: "Sacred Lake",
      description: "Ceremonial Lake - Used for Religious Rituals and Purification",
      image: karnak3
    },
    {
      id: 4,
      title: "Obelisks of Hatshepsut",
      description: "Monolithic Granite Obelisks - Dedicated to the Sun God",
      image: karnak4
    }
  ];

  const ticketTypes = [
    {
      id: 1,
      type: "General Admission",
      price: "180 EGP",
      features: [
        "Access to Karnak Temple Complex",
        "Self-guided tour of main areas",
        "Visit to Great Hypostyle Hall",
        "Valid for one day",
        "Access to open courtyards"
      ]
    },
    {
      id: 2,
      type: "Guided Experience",
      price: "350 EGP",
      features: [
        "Access to Karnak Temple Complex",
        "Professional guided tour (2 hours)",
        "Detailed historical explanations",
        "Visit to Temple of Amun-Ra",
        "Sacred Lake access",
        "Obelisks viewing"
      ]
    },
    {
      id: 3,
      type: "Premium Full Access",
      price: "600 EGP",
      features: [
        "All Guided Experience features",
        "Extended guided tour (4 hours)",
        "Access to restricted areas",
        "Sound & Light show ticket",
        "Egyptologist expert guide",
        "Museum entry included",
        "Priority access"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % karnakSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [karnakSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % karnakSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + karnakSlides.length) % karnakSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleBookTicket = (ticket) => {
    // Extract numeric price from string (remove " EGP")
    const price = parseInt(ticket.price.replace(' EGP', ''));
    
    // Add to cart using Redux
    addItem({
      id: `karnak-${ticket.id}`, // Unique ID for this attraction + ticket type
      type: 'attraction',
      name: `Karnak Temple - ${ticket.type}`,
      price: price,
      location: 'Karnak, Luxor',
      quantity: 1
    });

    // Optional: Show success message or navigate to cart
    alert(`✅ ${ticket.type} added to cart!`);
    
    // Optional: Navigate to tickets page
    // navigate('/tickets');
  };

  return (
    <div className="karnak-page">
      <Navbar />
      
      {/* الكاروسيل */}
      <div className="temple-carousel">
        {karnakSlides.map((slide, index) => (
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
          {karnakSlides.map((_, index) => (
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

        {/* قسم معلومات معبد الكرنك */}
        <div className="temple-info">
          <h2>The Karnak Temple Complex</h2>
          <div className="info-content">
            <div className="info-card">
              <h3>The Great Hypostyle Hall</h3>
              <p>
                Covering an area of 5,000 square meters, the Great Hypostyle Hall contains 
                134 massive columns arranged in 16 rows. The central 12 columns stand at 
                21 meters tall, while the others are 15 meters high. This architectural 
                marvel was built during the reign of Seti I and completed by Ramesses II.
              </p>
            </div>

            <div className="info-card">
              <h3>Center of Ancient Worship</h3>
              <p>
                Karnak was the most important religious site in ancient Egypt for over 
                2,000 years. Dedicated primarily to the god Amun-Ra, the complex grew 
                through contributions from more than 30 pharaohs, resulting in a unique 
                collection of temples, chapels, pylons, and obelisks spanning multiple 
                dynasties.
              </p>
            </div>

            <div className="info-card">
              <h3>Architectural Evolution</h3>
              <p>
                The temple complex showcases the evolution of ancient Egyptian architecture 
                from the Middle Kingdom through the Ptolemaic period. Each pharaoh added 
                their own structures, creating a vast open-air museum that represents 
                different artistic styles and construction techniques across centuries 
                of Egyptian history.
              </p>
            </div>

            <div className="highlight">
              <h4>Walk Through Ancient History</h4>
              <p>
                Experience the grandeur of ancient Thebes and explore the largest 
                religious building ever constructed. Karnak Temple offers a unique 
                journey through time, where every stone tells a story of pharaohs, 
                priests, and the eternal gods of Egypt.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default KarnakPage;