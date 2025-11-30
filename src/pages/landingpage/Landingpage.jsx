import React from "react";
import "./Landingpage.css";
import Navbar from "./navbar/Navbar.jsx";
import HeroSection from "../../components/HeroSection";
import Section1 from "./section1/Section1.jsx";
import Section2 from "./section2/Section2.jsx";
import Footer from "./footer/Footer.jsx";

export default function LandingPage() {
  return (
    <>
      

      {/* This wrapper puts ALL content (including navbar) on top */}
      <div className="page-content">
        <Navbar />
        {/* Full-screen 3D hero — stays behind everything */}
      <HeroSection />
        <Section1 />
        <Section2 />
        <Footer />
      </div>
    </>
  );
}