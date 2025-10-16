import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './EventBooking.css';

const EventBooking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;

  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    tickets: 1,
    paymentMethod: 'card'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate booking process
    console.log('Booking submitted:', { event, bookingData });
    alert(`🎉 Booking confirmed for ${event?.name?.text}! Check your email for confirmation.`);
    navigate('/bookings');
  };

  if (!event) {
    return (
      <div className="booking-container">
        <div className="error-state">
          <h2>Event Not Found</h2>
          <p>The event you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/explore')}>Back to Events</button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="booking-header">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Book Your Tickets</h1>
      </div>

      <div className="booking-content">
        <div className="event-summary">
          <div className="event-image">
            <img src={event.logo?.url} alt={event.name?.text} />
          </div>
          <div className="event-details">
            <h2>{event.name?.text}</h2>
            <p className="event-category">{event.category}</p>
            <p className="event-date">📅 {event.formattedDate}</p>
            <p className="event-venue">📍 {event.venue?.name}</p>
            <p className="event-price">
              {event.isFree ? 'FREE' : 'Starting from $25'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <h3>Attendee Information</h3>
          
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              required
              value={bookingData.name}
              onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              required
              value={bookingData.email}
              onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={bookingData.phone}
              onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>Number of Tickets *</label>
            <select
              value={bookingData.tickets}
              onChange={(e) => setBookingData({...bookingData, tickets: parseInt(e.target.value)})}
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num} ticket{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {!event.isFree && (
            <div className="form-group">
              <label>Payment Method *</label>
              <select
                value={bookingData.paymentMethod}
                onChange={(e) => setBookingData({...bookingData, paymentMethod: e.target.value})}
              >
                <option value="card">Credit/Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="upi">UPI</option>
              </select>
            </div>
          )}

          <div className="booking-summary">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Tickets ({bookingData.tickets}):</span>
              <span>{event.isFree ? 'FREE' : `$${bookingData.tickets * 25}`}</span>
            </div>
            {!event.isFree && (
              <div className="summary-row">
                <span>Service fee:</span>
                <span>${(bookingData.tickets * 2).toFixed(2)}</span>
              </div>
            )}
            <div className="summary-total">
              <span>Total:</span>
              <span>
                {event.isFree ? 'FREE' : `$${(bookingData.tickets * 27).toFixed(2)}`}
              </span>
            </div>
          </div>

          <button type="submit" className="confirm-booking-btn">
            {event.isFree ? 'Confirm Registration' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventBooking;