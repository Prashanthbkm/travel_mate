import React, { useState, useEffect } from 'react';
import FlightHotelSearch from './FlightHotelSearch';
import BookingManagement from './BookingManagement';
import RealTimeFeatures from '../RealTimeFeatures/RealTimeFeatures';
import '../styles/BookingIntegration.css';
import axios from 'axios';
import { getCurrentUser, isAuthenticated, logout } from '../../api.js'; // ✅ Correct import

const API_BASE_URL = 'http://localhost:8080/api';

const BookingIntegration = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [bookings, setBookings] = useState([]);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [currentDates, setCurrentDates] = useState({ start: null, end: null });
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from authentication
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (user && user.userId) {
      loadBookings(user.userId);
    } else {
      // Load from localStorage as fallback
      const savedBookings = localStorage.getItem('travelBookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    }
  }, []);

  const loadBookings = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/bookings/user/${userId}`);
      
      if (response.data && Array.isArray(response.data)) {
        // Transform backend data to match frontend structure
        const transformedBookings = response.data.map(booking => ({
          id: booking.id,
          type: booking.trip?.tripType === 'flight' ? 'flights' : 'hotels',
          details: {
            airline: booking.trip?.airline,
            flightNumber: booking.trip?.flightNumber,
            departure: booking.trip?.departure,
            arrival: booking.trip?.arrival,
            departureTime: booking.trip?.departureTime,
            arrivalTime: booking.trip?.arrivalTime,
            date: booking.trip?.startDate,
            duration: booking.trip?.durationText,
            stops: booking.trip?.stops,
            price: booking.trip?.price,
            name: booking.trip?.hotelName,
            location: booking.trip?.destination,
            checkIn: booking.trip?.checkInDate,
            checkOut: booking.trip?.checkOutDate,
            rating: booking.trip?.rating,
            amenities: booking.trip?.amenities ? booking.trip.amenities.split(',') : [],
            address: booking.trip?.address,
            rooms: booking.trip?.roomCount
          },
          bookedAt: booking.bookingDate,
          status: booking.status,
          passengerCount: booking.trip?.passengerCount,
          roomCount: booking.trip?.roomCount
        }));
        
        setBookings(transformedBookings);
      }
    } catch (error) {
      console.error('Failed to load bookings from backend:', error);
      // Fallback to localStorage
      const savedBookings = localStorage.getItem('travelBookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    } finally {
      setLoading(false);
    }
  };

  const addBooking = async (newBooking) => {
    if (!currentUser) {
      alert('Please login to make a booking');
      return;
    }

    try {
      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);
      localStorage.setItem('travelBookings', JSON.stringify(updatedBookings));
      
      // Try to save to backend if user is authenticated
      if (currentUser.userId) {
        try {
          // You'll need to implement proper trip creation first
          // await axios.post(`${API_BASE_URL}/bookings/user/${currentUser.userId}/trip/1`);
        } catch (backendError) {
          console.log('Backend save failed, using localStorage only');
        }
      }
      
      alert(`Booking confirmed for ${newBooking.type === 'flights' ? 'flight' : 'hotel'}!`);
      
    } catch (error) {
      console.error('Failed to create booking:', error);
      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);
      localStorage.setItem('travelBookings', JSON.stringify(updatedBookings));
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      if (currentUser?.userId) {
        await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
      }
      
      const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('travelBookings', JSON.stringify(updatedBookings));
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const handleSearchParams = (destination, dates) => {
    setCurrentDestination(destination);
    if (dates) {
      setCurrentDates({
        start: dates.start || null,
        end: dates.end || null
      });
    }
  };

  // Show login prompt if user is not authenticated
  if (!isAuthenticated()) {
    return (
      <div className="booking-container">
        <div style={{ 
          textAlign: 'center', 
          padding: '50px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          color: 'white',
          margin: '20px'
        }}>
          <h2>🔒 Please Login to Access Bookings</h2>
          <p>You need to be logged in to view and make travel bookings.</p>
          <button 
            onClick={() => window.location.href = '/login'} 
            style={{ 
              padding: '12px 24px', 
              marginTop: '20px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Travel Booking & Planning</h2>
        <div style={{ 
          background: '#f0f9ff', 
          padding: '10px 15px', 
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>👋</span>
          <span>Welcome, <strong>{currentUser?.username}</strong>!</span>
        </div>
      </div>
      
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
          {currentDestination && currentDates.start && currentDates.end && (
            <RealTimeFeatures 
              initialDestination={currentDestination}
              startDate={currentDates.start}
              endDate={currentDates.end}
              onDestinationSelect={setCurrentDestination}
            />
          )}
        </div>
      ) : (
        <BookingManagement 
          bookings={bookings} 
          onCancelBooking={cancelBooking} 
          loading={loading}
        />
      )}
    </div>
  );
};

export default BookingIntegration;
