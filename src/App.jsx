import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './Store';
import LandingPage from "./pages/landingpage/Landingpage.jsx";
import Gallery from "./pages/gallery/Gallery.jsx";
import LoginPage from "./pages/login page/LoginPage.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import TicketsPage from "./pages/tickets/TicketsPage.jsx";
import GizaPage from "./pages/giza/GizaPage.jsx";
import KarnakPage from "./pages/karnak/KarnakPage.jsx";
import AbuSimbelPage from "./pages/abu-simbel/AbuSimbelPage.jsx";
import CitadelPage from "./pages/citadel/CitadelPage.jsx";
import EventsPage from "./pages/events/EventsPage/EventsPage.jsx";
import Museum from "./pages/Egy_museum/NewEgyptianMuseumPage.jsx";
import CityPage from "./pages/events/maps/CityPage.jsx";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tickets" element={<TicketsPage />} />

          {/* الصفحات الجديدة */}
          <Route path="/giza" element={<GizaPage />} />
          <Route path="/karnak" element={<KarnakPage />} />
          <Route path="/abu-simbel" element={<AbuSimbelPage />} />
          <Route path="/citadel" element={<CitadelPage />} />
          <Route path="/events" element={<EventsPage/>}/>
          <Route path="/Egy_museum" element={<Museum/>}/>
          <Route path="/events/city/:citySlug" element={<CityPage />} />
        </Routes>
      </div>
    </Provider>
  );
}