import React from 'react';
import Navbar from "../landingpage/navbar/Navbar.jsx";
import Footer from "../landingpage/footer/Footer.jsx";
import { useCart } from '../../hooks/useCart';
import './TicketsPage.css';

const TicketsPage = () => {
  const { items, total, itemCount, updateItemQuantity, removeItem, clearCart } = useCart();

  const handleQuantityChange = (uniqueId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(uniqueId);
    } else {
      updateItemQuantity(uniqueId, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // Here you would integrate with payment system
  };

  if (items.length === 0) {
    return (
      <div className="tickets-page">
        <Navbar />
        <div className="empty-cart">
          <h2>Your Tickets</h2>
          <div className="empty-state">
            <div className="empty-icon">🎫</div>
            <h3>No tickets yet</h3>
            <p>Explore our attractions and events to add tickets to your cart</p>
            <button 
              className="explore-btn"
              onClick={() => window.history.back()}
            >
              Explore Attractions
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="tickets-page">
      <Navbar />
      
      <div className="tickets-container">
        <div className="tickets-header">
          <h2>Your Tickets ({itemCount} items)</h2>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear All
          </button>
        </div>

        <div className="tickets-content">
          <div className="tickets-list">
            {items.map((item) => (
              <div key={item.uniqueId} className="ticket-item">
                <div className="ticket-info">
                  <div className="ticket-type-badge">
                    {item.type === 'attraction' ? '🏛️ Attraction' : '🎪 Event'}
                  </div>
                  <h3 className="ticket-name">{item.name}</h3>
                  <p className="ticket-location">📍 {item.location}</p>
                  {item.date && (
                    <p className="ticket-date">📅 {new Date(item.date).toLocaleDateString()}</p>
                  )}
                  <p className="ticket-price">{item.price} EGP</p>
                </div>

                <div className="ticket-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.uniqueId, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.uniqueId, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.uniqueId)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>

                <div className="ticket-subtotal">
                  {item.price * item.quantity} EGP
                </div>
              </div>
            ))}
          </div>

          <div className="tickets-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({itemCount} items):</span>
                <span>{total} EGP</span>
              </div>
              <div className="summary-row">
                <span>Service Fee:</span>
                <span>0 EGP</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{total} EGP</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TicketsPage;