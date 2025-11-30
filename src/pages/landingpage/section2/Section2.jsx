
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Section2.css';

// Import images - make sure these paths are correct
import gizaImage from '../../../assets/giza.jpg';
import karnakImage from '../../../assets/karnak temple.png';
import abuSimbelImage from '../../../assets/abu-simple-temple-in-aswan_zLkWb.jpeg';
import citadelImage from '../../../assets/Salah El din citadel_71cb2_lg.jpg';
import Egy_museumImage from'../../../assets/Grand20Egyptian20Museum20Image-768x555.jpg'

export default function Section2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const attractions = [
    {
      id: 1,
      title: "Giza Plateau",
      subtitle: "Pyramids & Sphinx",
      description: "The timeless wonders of Egypt — the Great Pyramid and the mighty Sphinx guarding the desert for millennia.",
      image: gizaImage,
      period: "2580–2560 BC",
      location: "Giza, Cairo"
    },
    {
      id: 2,
      title: "Karnak Temple Complex",
      subtitle: "Luxor's Grand Sanctuary",
      description: "A massive temple complex dedicated to Amun-Ra, featuring towering columns and intricate hieroglyphic carvings.",
      image: karnakImage,
      period: "2055 BC – 100 AD",
      location: "Luxor"
    },
    {
      id: 3,
      title: "Abu Simbel Temples",
      subtitle: "Ramses II's Legacy",
      description: "Colossal rock temples masterfully relocated to save them from Lake Nasser's rising waters.",
      image: abuSimbelImage,
      period: "1264 BC",
      location: "Aswan Governorate"
    },
    {
      id: 4,
      title: "Citadel of Saladin",
      subtitle: "Medieval Fortress",
      description: "A majestic Islamic fortress overlooking Cairo, home to the stunning Mosque of Muhammad Ali.",
      image: citadelImage,
      period: "1176–1183 AD",
      location: "Cairo"
    },
    {
      id: 5,
      title: "NewEgyptianMuseumPage",
      subtitle: "World's Largest Archaeological Museum",
      description: "The world's largest archaeological museum housing King Tut's complete treasures at the foot of the Giza pyramids.",
      image: Egy_museumImage,
      period: "1176–1183 AD",
      location: "Cairo"
    }

  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % attractions.length);
    }, 1000000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, attractions.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % attractions.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + attractions.length) % attractions.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const navigate = useNavigate();

  const handleDiscoverMore = (attraction) => {
    if (attraction.id === 1) navigate('/giza');
    if (attraction.id === 2) navigate('/karnak');
    if (attraction.id === 3) navigate('/abu-simbel');
    if (attraction.id === 4) navigate('/citadel');
    if (attraction.id === 5) navigate('/Egy_Museum');

  };

  return (
    <section id="attractions" className="attractions-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Explore Egypt's Timeless Wonders</h2>
          <p className="section-subtitle">
            Journey through 5,000 years of history at the world's most magnificent ancient sites
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Custom Carousel */}
        <div 
          className="custom-carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="carousel-container">
            
            <div
              className="carousel-track"
              style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.5s ease-in-out' // تأكد من وجود هذا
              }}
              >
            
              {attractions.map((attraction, index) => (
                <div
                  key={attraction.id}
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <div className="image-overlay"></div>
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="carousel-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      console.log(`Image failed to load: ${attraction.title}`);
                    }}
                  />
                  
                  {/* Caption Content */}
                  <div className="carousel-caption">
                    <div className="caption-content">
                      <div className="attraction-meta">
                        <span className="period">{attraction.period}</span>
                        <span className="location">{attraction.location}</span>
                      </div>
                      <h3 className="attraction-title">
                        {attraction.title}
                        <span className="attraction-subtitle">{attraction.subtitle}</span>
                      </h3>
                      <p className="attraction-description">{attraction.description}</p>
                      <button 
                        className="discover-btn"
                        onClick={() => handleDiscoverMore(attraction)}
                      >
                        Discover More
                        <span className="btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              className="carousel-btn carousel-btn-prev" 
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className="carousel-btn carousel-btn-next" 
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Indicators */}
            <div className="carousel-indicators">
              {attractions.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="attractions-info">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">🏺</div>
              <h4>Ancient Marvels</h4>
              <p>Explore monuments that have stood for millennia</p>
            </div>
            <div className="info-item">
              <div className="info-icon">👑</div>
              <h4>Pharaonic Legacy</h4>
              <p>Walk in the footsteps of kings and queens</p>
            </div>
            <div className="info-item">
              <div className="info-icon">📜</div>
              <h4>Rich History</h4>
              <p>Discover stories carved in stone and hieroglyphs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}