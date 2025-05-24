import React, { useState, useEffect } from 'react';
import FlightHotelSearch from './FlightHotelSearch';
import BookingManagement from './BookingManagement';
import RealTimeFeatures from '../RealTimeFeatures/RealTimeFeatures'; // Corrected Path
import '../styles/BookingIntegration.css';

const BookingIntegration = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [bookings, setBookings] = useState([]);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [currentDates, setCurrentDates] = useState({ start: null, end: null });

  useEffect(() => {
    // Load bookings from localStorage if available
    const savedBookings = localStorage.getItem('travelBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const addBooking = (newBooking) => {
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('travelBookings', JSON.stringify(updatedBookings));
  };

  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('travelBookings', JSON.stringify(updatedBookings));
  };

  const handleSearchParams = (destination, dates) => {
    setCurrentDestination(destination);
    setCurrentDates(dates);
  };

  return (
    <div className="booking-container">
      <h2>Travel Booking & Planning</h2>
      
      <div className="tabs">
        <button 
          className={activeTab === 'search' ? 'active' : ''}
          onClick={() => setActiveTab('search')}
        >
          Search & Book
        </button>
        <button 
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          My Bookings ({bookings.length})
        </button>
      </div>

      {activeTab === 'search' ? (
        <div className="search-section">
          <FlightHotelSearch 
            onBookingMade={addBooking}
            onSearch={handleSearchParams}
          />
          <RealTimeFeatures 
            initialDestination={currentDestination}
            startDate={currentDates.start}
            endDate={currentDates.end}
            onDestinationSelect={setCurrentDestination}
          />
        </div>
      ) : (
        <BookingManagement 
          bookings={bookings} 
          onCancelBooking={cancelBooking} 
        />
      )}
    </div>
  );
};

export default BookingIntegration;
