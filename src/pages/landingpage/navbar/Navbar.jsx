import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from '../../../hooks/useCart'; // Import the cart hook
import "./Navbar.css";
import logo from "../../../assets/Adobe Express - file (2).png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart(); // We still need this for potential future use

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active link based on current route
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/':
        setActiveLink('home');
        break;
      case '/gallery':
        setActiveLink('gallery');
        break;
      case '/login':
        setActiveLink('signin');
        break;
      case '/contact':
        setActiveLink('contact');
        break;
      case '/profile':
        setActiveLink('profile');
        break;
      case '/tickets':
        setActiveLink('tickets');
        break;
      case '/events':
        setActiveLink('events');
        break;
      default:
        setActiveLink('home');
        break;
    }
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (section, e) => {
    if (e) e.preventDefault();
    setActiveLink(section);
    setIsMobileMenuOpen(false);

    // Handle navigation for pages that don't have sections
    const pageRoutes = {
      "signin": "/login",
      "profile": "/profile",
      "tickets": "/tickets",
      "events": "/events",
      "gallery": "/gallery",
      "contact": "/contact"
    };

    if (pageRoutes[section]) {
      navigate(pageRoutes[section]);
      return;
    }

    // Handle home page sections
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const target = document.getElementById(section);
        if (target) {
          const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }, 0);
      return;
    }
    
    const target = document.getElementById(section);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => handleNavClick("home", e)}
        >
          <img src={logo} alt="Egypt Unpacked Logo" className="logo-img" />
          <span className="project-name">Egypt Unpacked</span>
        </a>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="navbar-nav">
          <Link
            to="/"
            className={`nav-item ${activeLink === "home" ? "active" : ""}`}
            onClick={(e) => handleNavClick("home", e)}
          >
            Home
          </Link>
          
          {/* Tickets Link - No badge */}
          <Link
            to="/tickets"
            className={`nav-item ${activeLink === "tickets" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("tickets");
              navigate("/tickets");
              setIsMobileMenuOpen(false);
            }}
          >
            Tickets
          </Link>
          
          <Link
            to="/events"
            className={`nav-item ${activeLink === "events" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("events");
              navigate("/events");
              setIsMobileMenuOpen(false);
            }}
          >
            Events
          </Link>
          
          <Link
            to="/gallery"
            className={`nav-item ${activeLink === "gallery" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("gallery");
              navigate("/gallery");
              setIsMobileMenuOpen(false);
            }}
          >
            Gallery
          </Link>
          
          <Link
            to="/contact"
            className={`nav-item ${activeLink === "contact" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("contact");
              navigate("/contact");
              setIsMobileMenuOpen(false);
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Auth Buttons - Hidden on mobile */}
        <div className="navbar-actions">
          <button
            className={`profile-btn ${activeLink === "profile" ? "active" : ""}`}
            onClick={(e) => handleNavClick("profile", e)}
          >
            Profile
          </button>
          <button
            className="signin-btn"
            onClick={(e) => handleNavClick("signin", e)}
          >
            Sign In
          </button>
        </div>

        {/* Hamburger Menu - Visible only on mobile */}
        <button
          className={`hamburger-menu ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-nav-items">
          <Link
            to="/"
            className={`mobile-nav-item ${activeLink === "home" ? "active" : ""}`}
            onClick={(e) => handleNavClick("home", e)}
          >
            Home
          </Link>
          
          {/* Mobile Tickets Link - No badge */}
          <Link
            to="/tickets"
            className={`mobile-nav-item ${activeLink === "tickets" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("tickets");
              navigate("/tickets");
              setIsMobileMenuOpen(false);
            }}
          >
            Tickets
          </Link>
          
          <Link
            to="/events"
            className={`mobile-nav-item ${activeLink === "events" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("events");
              navigate("/events");
              setIsMobileMenuOpen(false);
            }}
          >
            Events
          </Link>
          
          <Link
            to="/gallery"
            className={`mobile-nav-item ${activeLink === "gallery" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("gallery");
              navigate("/gallery");
              setIsMobileMenuOpen(false);
            }}
          >
            Gallery
          </Link>
          
          <Link
            to="/contact"
            className={`mobile-nav-item ${activeLink === "contact" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("contact");
              navigate("/contact");
              setIsMobileMenuOpen(false);
            }}
          >
            Contact
          </Link>
          
          <button
            className={`mobile-profile-btn ${activeLink === "profile" ? "active" : ""}`}
            onClick={(e) => handleNavClick("profile", e)}
          >
            Profile
          </button>
          
          <button
            className="mobile-signin-btn"
            onClick={(e) => handleNavClick("signin", e)}
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}