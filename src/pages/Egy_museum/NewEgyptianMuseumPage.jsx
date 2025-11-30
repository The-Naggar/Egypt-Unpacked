import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../landingpage/navbar/Navbar.jsx";
import Footer from "../landingpage/footer/Footer.jsx";
import { useCart } from '../../hooks/useCart'; // Import the cart hook
import './NewEgyptianMuseumPage.css';

// استيراد الصور مباشرة
import museum1 from "../../assets/Egyptian_President_Abdel_Fattah_al-Sisi_with_representatives_of_foreign_countries_at_the_official_opening_of_the_Grand_Egyptian_Museum.jpg";
import museum2 from "../../assets/Grand_Egyptian_Museum_-_Mohamed_Abdelzaher_1.jpg";
import museum3 from "../../assets/cscssss.jpg";
import museum4 from "../../assets/666.jpg";

const NewEgyptianMuseumPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart(); // Get addItem function from cart hook

  const museumSlides = [
    {
      id: 1,
      title: "The Grand Egyptian Museum",
      description: "World's Largest Archaeological Museum - Home to Ancient Treasures",
      image: museum1
    },
    {
      id: 2,
      title: "Tutankhamun Gallery", 
      description: "Complete Collection of King Tut's Treasures - First Time Displayed Together",
      image: museum2
    },
    {
      id: 3,
      title: "The Grand Staircase",
      description: "Monumental Staircase Featuring 87 Royal Statues and Artifacts",
      image: museum3
    },
    {
      id: 4,
      title: "Modern Architecture",
      description: "State-of-the-Art Design Blending Ancient Heritage with Contemporary Technology",
      image: museum4
    }
  ];

  const ticketTypes = [
    {
      id: 1,
      type: "General Admission",
      price: "400 EGP",
      features: [
        "Access to all permanent exhibitions",
        "Self-guided tour of the museum",
        "Audio guide available in multiple languages",
        "Valid for one day",
        "Museum map and information brochure",
        "Access to public areas and gardens"
      ]
    },
    {
      id: 2,
      type: "Guided Experience",
      price: "650 EGP",
      features: [
        "All General Admission features",
        "Professional guided tour (3 hours)",
        "Expert Egyptologist guide",
        "Priority access to Tutankhamun Gallery",
        "Detailed explanations of key artifacts",
        "Historical context and stories",
        "Small group size for better experience"
      ]
    },
    {
      id: 3,
      type: "Premium Full Access",
      price: "1200 EGP",
      features: [
        "All Guided Experience features",
        "Extended guided tour (5 hours)",
        "Early access before public hours",
        "Exclusive access to special exhibitions",
        "Photography permission included",
        "Complimentary refreshments",
        "Private locker for belongings",
        "Skip-the-line priority access"
      ]
    },
    {
      id: 4,
      type: "Family Package",
      price: "900 EGP",
      features: [
        "Admission for 2 adults and 2 children",
        "Family-friendly guided tour",
        "Interactive activities for children",
        "Educational materials for kids",
        "Family audio guides",
        "Child-friendly restaurant discounts",
        "Souvenir gift for children"
      ]
    }
  ];

  const museumHighlights = [
    {
      title: "The Complete Tutankhamun Collection",
      description: "For the first time in history, all 5,000+ items from King Tut's tomb are displayed together in a dedicated gallery spanning 7,000 square meters."
    },
    {
      title: "The Grand Staircase",
      description: "A monumental staircase featuring 87 royal statues and large artifacts, creating a breathtaking introduction to Egypt's ancient civilization."
    },
    {
      title: "High-Tech Conservation Labs",
      description: "State-of-the-art laboratories where visitors can watch archaeologists and conservators working on ancient artifacts through glass walls."
    },
    {
      title: "Virtual Reality Experiences",
      description: "Cutting-edge VR technology that allows visitors to experience ancient Egyptian sites and rituals in immersive digital reconstructions."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % museumSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [museumSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % museumSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + museumSlides.length) % museumSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleBookTicket = (ticket) => {
    // Extract numeric price from string (remove " EGP")
    const price = parseInt(ticket.price.replace(' EGP', ''));
    
    // Add to cart using Redux
    addItem({
      id: `museum-${ticket.id}`, // Unique ID for this attraction + ticket type
      type: 'attraction',
      name: `Grand Egyptian Museum - ${ticket.type}`,
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
    <div className="new-egyptian-museum-page">
      <Navbar />
      
      {/* Carousel Section */}
      <div className="museum-carousel">
        {museumSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url(${slide.image})`
            }}
          >
            <div className="slide-content">
              <h1></h1>
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
          {museumSlides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Main Content - Two Sections Side by Side */}
      <div className="main-content">
        {/* Tickets Section */}
        <div className="tickets-section">
          <h2>Ticket Packages & Admission</h2>
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

        {/* Museum Information Section */}
        <div className="museum-info">
          <h2>The Grand Egyptian Museum Experience</h2>
          <div className="info-content">
            <div className="info-card">
              <h3>World's Largest Archaeological Museum</h3>
              <p>
                Spanning over 500,000 square meters at the foot of the Giza Plateau, 
                the Grand Egyptian Museum represents the most significant cultural project 
                of the 21st century. Housing approximately 100,000 artifacts, including 
                the complete Tutankhamun collection, this architectural marvel bridges 
                ancient history with modern technology and preservation techniques.
              </p>
            </div>

            <div className="info-card">
              <h3>Architectural Masterpiece</h3>
              <p>
                Designed by Heneghan Peng Architects, the museum's translucent stone 
                facade allows natural light to illuminate the exhibits while protecting 
                the artifacts. The innovative design creates a visual corridor connecting 
                the pyramids to the museum, symbolizing the continuity of Egyptian 
                civilization from ancient times to the present day.
              </p>
            </div>

            <div className="highlights-section">
              <h3>Museum Highlights</h3>
              <div className="highlights-grid">
                {museumHighlights.map((highlight, index) => (
                  <div key={index} className="highlight-card">
                    <h4>{highlight.title}</h4>
                    <p>{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="visitor-info">
              <h3>Visitor Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <h4>Opening Hours</h4>
                  <p>Daily: 9:00 AM - 6:00 PM</p>
                  <p>Last entry: 4:00 PM</p>
                </div>
                <div className="info-item">
                  <h4>Location</h4>
                  <p>Giza Plateau, Cairo</p>
                  <p>5 km from the Great Pyramids</p>
                </div>
                <div className="info-item">
                  <h4>Facilities</h4>
                  <p>Restaurants & Cafes</p>
                  <p>Gift Shops & Bookstore</p>
                  <p>Free Wi-Fi throughout</p>
                </div>
                <div className="info-item">
                  <h4>Accessibility</h4>
                  <p>Wheelchair accessible</p>
                  <p>Elevators and ramps</p>
                  <p>Accessible restrooms</p>
                </div>
              </div>
            </div>

            <div className="conservation-message">
              <h4>A New Home for Ancient Treasures</h4>
              <p>
                The Grand Egyptian Museum represents Egypt's commitment to preserving 
                its priceless heritage for future generations while making it accessible 
                to the world. Through advanced conservation techniques, interactive 
                displays, and immersive experiences, the museum brings ancient Egypt 
                to life like never before.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NewEgyptianMuseumPage;