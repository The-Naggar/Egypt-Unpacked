import React from "react";
import Navbar from "../landingpage/navbar/Navbar.jsx";
import Footer from "../landingpage/footer/Footer.jsx";
import "./Gallery.css";

import giza from "../../assets/giza.jpg";
import karnak from "../../assets/karnak temple.png";
import abu from "../../assets/abu-simple-temple-in-aswan_zLkWb.jpeg";
import citadel from "../../assets/Salah El din citadel_71cb2_lg.jpg";
import nile from "../../assets/egyptiangeographic.com_1598564605_1.jpg";
import cairo from "../../assets/old cairo.jpeg";

export default function Gallery() {
  const items = [
    { src: giza, title: "Giza Plateau", text: "Great Pyramid and the Sphinx at sunset." },
    { src: karnak, title: "Karnak Temple", text: "Hypostyle hall with towering columns." },
    { src: abu, title: "Abu Simbel", text: "Colossal statues of Ramses II." },
    { src: citadel, title: "Citadel of Saladin", text: "Panoramic views over Cairo." },
    { src: nile, title: "The Nile", text: "Peaceful river flowing through history." },
    { src: cairo, title: "Old Cairo", text: "Streets steeped in heritage." }
  ];

  return (
    <div className="gallery-page">
      <Navbar />
      <main className="gallery-main">
        <header className="gallery-hero">
          <h1 className="gallery-title">Egypt Unpacked Gallery</h1>
          <p className="gallery-subtitle">Timeless sights and stories captured in moments</p>
          <div className="gallery-divider"></div>
        </header>

        <section className="gallery-grid" aria-label="image gallery">
          {items.map((item, idx) => (
            <figure key={idx} className="gallery-card">
              <img src={item.src} alt={item.title} className="gallery-image" />
              <figcaption className="gallery-caption">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </figcaption>
            </figure>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}


