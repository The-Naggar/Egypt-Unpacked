import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../landingpage/navbar/Navbar.jsx";
import Footer from "../landingpage/footer/Footer.jsx";
import { useCart } from '../../hooks/useCart'; // Import the cart hook
import './AbuSimbelPage.css';

// استيراد الصور مباشرة - تحتاجين لاستبدالها بالصور الفعلية
import abuSimbel1 from "../../assets/9d159a77adbdbe257b0c806d91dd0679.jpg";
import abuSimbel2 from "../../assets/Abu-Simbel-Small-Temple.jpg.optimal.jpg";
import abuSimbel3 from "../../assets/WhatsApp Image 2025-11-20 at 14.57.56_bf7e2cf7.jpg";
import abuSimbel4 from "../../assets/The hypostyle hall of the Great Temple of Abu Simbel..jpg";

const AbuSimbelPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart(); // Get addItem function from cart hook

  const abuSimbelSlides = [
    {
      id: 1,
      title: "The Great Temple of Ramses II",
      description: "Monumental Facade - Four Colossal Seated Statues of Ramses II",
      image: abuSimbel1
    },
    {
      id: 2,
      title: "Temple of Hathor", 
      description: "Dedicated to Queen Nefertari - Goddess of Love and Beauty",
      image: abuSimbel2
    },
    {
      id: 3,
      title: "The Sanctuary",
      description: "Inner Sanctum - Illuminated by Sun Rays Twice Yearly",
      image: abuSimbel3
    },
    {
      id: 4,
      title: "The Relocation Miracle",
      description: "UNESCO Rescue Operation - Moved to Save from Nile Waters",
      image: abuSimbel4
    }
  ];

  const ticketTypes = [
    {
      id: 1,
      type: "General Admission",
      price: "240 EGP",
      features: [
        "Access to Abu Simbel Temples",
        "Self-guided tour of both temples",
        "Exterior viewing of colossal statues",
        "Valid for one day",
        "Information brochure included"
      ]
    },
    {
      id: 2,
      type: "Guided Experience",
      price: "450 EGP",
      features: [
        "Access to Abu Simbel Temples",
        "Professional guided tour (2.5 hours)",
        "Detailed historical explanations",
        "Entry to both Ramses II and Nefertari temples",
        "Sun alignment phenomenon explanation",
        "Relocation story documentation"
      ]
    },
    {
      id: 3,
      type: "Premium Full Access",
      price: "800 EGP",
      features: [
        "All Guided Experience features",
        "Extended guided tour (5 hours)",
        "Early morning access to avoid crowds",
        "Photography permission included",
        "Egyptologist expert guide",
        "Transportation from Aswan available",
        "Priority access and seating areas"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % abuSimbelSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [abuSimbelSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % abuSimbelSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + abuSimbelSlides.length) % abuSimbelSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleBookTicket = (ticket) => {
    // Extract numeric price from string (remove " EGP")
    const price = parseInt(ticket.price.replace(' EGP', ''));
    
    // Add to cart using Redux
    addItem({
      id: `abu-simbel-${ticket.id}`, // Unique ID for this attraction + ticket type
      type: 'attraction',
      name: `Abu Simbel - ${ticket.type}`,
      price: price,
      location: 'Abu Simbel, Aswan',
      quantity: 1
    });

    // Optional: Show success message or navigate to cart
    alert(`✅ ${ticket.type} added to cart!`);
    
    // Optional: Navigate to tickets page
    // navigate('/tickets');
  };

  return (
    <div className="abu-simbel-page">
      <Navbar />
      
      {/* الكاروسيل */}
      <div className="temple-carousel">
        {abuSimbelSlides.map((slide, index) => (
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
          {abuSimbelSlides.map((_, index) => (
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

        {/* قسم معلومات معبد أبو سمبل */}
        <div className="temple-info">
          <h2>The Abu Simbel Temples</h2>
          <div className="info-content">
            <div className="info-card">
              <h3>The Great Temple of Ramses II</h3>
              <p>
                Carved directly into the mountainside around 1264 BC, the Great Temple 
                features four colossal statues of Ramses II, each standing 20 meters tall. 
                The temple extends 60 meters deep into the rock and was dedicated to the 
                gods Amun, Ra-Horakhty, and Ptah, as well as to the deified Ramses himself.
              </p>
            </div>

            <div className="info-card">
              <h3>The Sun Alignment Phenomenon</h3>
              <p>
                Twice a year, on February 22 and October 22, the rising sun penetrates 
                the temple's inner sanctuary, illuminating statues of Ramses II and the 
                gods Amun and Ra-Horakhty. The statue of Ptah, god of darkness, remains 
                in shadow. These dates are believed to commemorate the king's birthday 
                and coronation day.
              </p>
            </div>

            <div className="info-card">
              <h3>The UNESCO Rescue Mission</h3>
              <p>
                In an unprecedented archaeological rescue during the 1960s, the entire 
                temple complex was carefully cut into massive blocks, moved 65 meters 
                higher, and reassembled to save it from the rising waters of Lake Nasser 
                created by the Aswan High Dam. This international effort cost $40 million 
                and took four years to complete.
              </p>
            </div>

            <div className="highlight">
              <h4>Marvel of Ancient Engineering</h4>
              <p>
                Witness one of Egypt's most spectacular monuments, where ancient 
                engineering meets modern preservation. Abu Simbel stands as a testament 
                to human ingenuity across millennia - from its original construction 
                to its miraculous relocation in the 20th century.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AbuSimbelPage;