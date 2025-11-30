import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CityPage.css";

// ====== IMPORT IMAGES ======
import cairo1 from "../../../assets/images/cairo1.jpg";
import cairo2 from "../../../assets/images/cairo2.jpg";
import cairo3 from "../../../assets/images/cairo3.jpg";

import alex1 from "../../../assets/images/alex1.jpg";
import alex2 from "../../../assets/images/alex2.jpg";
import alex3 from "../../../assets/images/alex3.jpg";

import giza1 from "../../../assets/images/giza1.jpg";
import giza2 from "../../../assets/images/giza2.jpg";
import giza3 from "../../../assets/images/giza3.jpg";

import lux1 from "../../../assets/images/lux1.jpg";
import lux2 from "../../../assets/images/lux2.jpg";
import lux3 from "../../../assets/images/lux3.jpg";

import hur1 from "../../../assets/images/hur1.jpg";
import hur2 from "../../../assets/images/hur2.jpg";
import hur3 from "../../../assets/images/hur3.jpg";

import sharm1 from "../../../assets/images/sharm1.jpg";
import sharm2 from "../../../assets/images/sharm2.jpg";
import sharm3 from "../../../assets/images/sharm3.jpg";

// ===== CITY DATA =====
const cities = {
  cairo: {
    title: "Cairo",
    images: [cairo1, cairo2, cairo3],
    description: "A city rich with ancient history and vibrant modern life.",
    visitors: 12000000,
  },
  alexandria: {
    title: "Alexandria",
    images: [alex1, alex2, alex3],
    description: "The Pearl of the Mediterranean with stunning sea views.",
    visitors: 8000000,
  },
  aswan: {
    title: "Aswan",
    images: [giza1, giza2, giza3], // ملاحظة: هذه الصور خاصة بالجيزة وليس أسوان
    description: "Home of the Great Pyramids and ancient wonders.",
    visitors: 9000000,
  },
  luxor: {
    title: "Luxor",
    images: [lux1, lux2, lux3],
    description: "The world's greatest open-air museum with royal tombs.",
    visitors: 6000000,
  },
  hurghada: {
    title: "Hurghada",
    images: [hur1, hur2, hur3],
    description: "A top Red Sea resort city known for diving and beaches.",
    visitors: 2500000,
  },
  "sharm-el-sheikh": {
    title: "Sharm El Sheikh",
    images: [sharm1, sharm2, sharm3],
    description: "A popular resort city famous for snorkeling and desert adventures.",
    visitors: 2000000,
  },
};

export default function CityPage() {
  const { citySlug } = useParams();
  const cityData = cities[citySlug];

  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showShare, setShowShare] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShare(true);
    setTimeout(() => setShowShare(false), 1500);
  };

  useEffect(() => {
    if (!cityData) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % cityData.images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [cityData]);

  if (!cityData) return <h1 className="not-found">City Not Found</h1>;

  return (
    <div className="city-container">
      <h1 className="city-title">{cityData.title}</h1>
      <p className="city-desc">{cityData.description}</p>
      <p className="visitors">
        Visitors per year: {cityData.visitors.toLocaleString()}
      </p>

      {/* Slider */}
      <div className="slider">
        {cityData.images.map((img, index) => (
          <div
            className={`slide ${index === current ? "active" : ""}`} // تم التصحيح هنا
            key={index}
          >
            <img src={img} alt={`${cityData.title}-${index}`} /> {/* تم التصحيح هنا */}
          </div>
        ))}
      </div>

      {/* 3D Card */}
      <div className="city-card">
        <h3>{cityData.title} Highlights</h3>
        <p>Discover the best attractions, lifestyle, food and culture in {cityData.title}.</p>

        <div className="actions">
          <button className="book-btn">Book Now</button>

          <div className="action-icons">
            <div className="like-wrapper" onClick={handleLike}>
              <span className={`like-btn ${liked ? "active" : ""}`}>❤</span> {/* تم التصحيح هنا */}
              <span className="likes-count">{likesCount}</span>
            </div>

            <div className="share-wrapper" onClick={handleShare}>
              <span className="share-btn">🔗</span>
            </div>
          </div>
        </div>

        {showShare && <div className="share-popup">Link Copied! 🔥</div>}
      </div>
    </div>
  );
}