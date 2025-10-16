import React from 'react';
import { FaPlane, FaHotel, FaTrash, FaPrint, FaInfoCircle } from 'react-icons/fa';

const BookingManagement = ({ bookings, onCancelBooking, loading = false }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      // Handle both ISO date strings and LocalDate objects from backend
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return 'Invalid date';
    }
  };

  const printBooking = (booking) => {
    const printWindow = window.open('', '_blank');
    const isFlight = booking.trip?.tripType === 'flight';
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Booking Confirmation - ${booking.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #2c3e50; }
            .booking-info { margin: 20px 0; }
            .detail { margin: 10px 0; }
            .footer { margin-top: 30px; font-size: 0.9em; color: #7f8c8d; }
          </style>
        </head>
        <body>
          <h1>Booking Confirmation</h1>
          <div class="booking-info">
            <div class="detail"><strong>Booking ID:</strong> ${booking.id}</div>
            <div class="detail"><strong>Type:</strong> ${isFlight ? 'Flight' : 'Hotel'}</div>
            ${isFlight ? `
              <div class="detail"><strong>Flight:</strong> ${booking.trip?.airline} ${booking.trip?.flightNumber}</div>
              <div class="detail"><strong>Route:</strong> ${booking.trip?.departure} → ${booking.trip?.arrival}</div>
              <div class="detail"><strong>Date:</strong> ${formatDate(booking.trip?.startDate)}</div>
              <div class="detail"><strong>Time:</strong> ${booking.trip?.departureTime} - ${booking.trip?.arrivalTime}</div>
            ` : `
              <div class="detail"><strong>Hotel:</strong> ${booking.trip?.hotelName}</div>
              <div class="detail"><strong>Location:</strong> ${booking.trip?.destination}</div>
              <div class="detail"><strong>Check-in:</strong> ${formatDate(booking.trip?.checkInDate)}</div>
              <div class="detail"><strong>Check-out:</strong> ${formatDate(booking.trip?.checkOutDate)}</div>
            `}
            <div class="detail"><strong>Status:</strong> ${booking.status}</div>
            <div class="detail"><strong>Booked on:</strong> ${formatDate(booking.bookingDate)}</div>
            <div class="detail"><strong>Price:</strong> $${booking.trip?.price || 'N/A'}</div>
          </div>
          <div class="footer">
            <p>Thank you for booking with us!</p>
            <p>For any questions, please contact customer support.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const showDetails = (booking) => {
    const isFlight = booking.trip?.tripType === 'flight';
    
    const details = isFlight ? 
      `Flight: ${booking.trip?.airline} ${booking.trip?.flightNumber}\n` +
      `Route: ${booking.trip?.departure} → ${booking.trip?.arrival}\n` +
      `Date: ${formatDate(booking.trip?.startDate)}\n` +
      `Time: ${booking.trip?.departureTime} - ${booking.trip?.arrivalTime}\n` +
      `Duration: ${booking.trip?.durationText}\n` +
      `Stops: ${booking.trip?.stops || 0}\n` +
      `Price: $${booking.trip?.price || 'N/A'}`
    : 
      `Hotel: ${booking.trip?.hotelName}\n` +
      `Location: ${booking.trip?.destination}\n` +
      `Check-in: ${formatDate(booking.trip?.checkInDate)}\n` +
      `Check-out: ${formatDate(booking.trip?.checkOutDate)}\n` +
      `Rating: ${booking.trip?.rating || 'N/A'}/5\n` +
      `Amenities: ${booking.trip?.amenities || 'N/A'}\n` +
      `Price: $${booking.trip?.price || 'N/A'}`;

    alert(`Booking Details:\n\n${details}\n\nStatus: ${booking.status}\nBooked on: ${formatDate(booking.bookingDate)}`);
  };

  if (loading) {
    return (
      <div className="booking-management">
        <div className="loading-spinner">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="booking-management">
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You don't have any bookings yet.</p>
          <p>Search and book flights or hotels to see them here.</p>
        </div>
      ) : (
        <ul className="bookings-list">
          {bookings.map((booking) => {
            const isFlight = booking.trip?.tripType === 'flight';
            
            return (
              <li key={booking.id} className="booking-item">
                <div className="booking-icon">
                  {isFlight ? <FaPlane size={24} /> : <FaHotel size={24} />}
                </div>
                <div className="booking-details">
                  <h4>
                    {isFlight 
                      ? `${booking.trip?.airline} Flight ${booking.trip?.flightNumber}`
                      : booking.trip?.hotelName}
                  </h4>
                  <p>
                    {isFlight
                      ? `${booking.trip?.departure} → ${booking.trip?.arrival} • ${formatDate(booking.trip?.startDate)}`
                      : `${booking.trip?.destination} • ${formatDate(booking.trip?.checkInDate)} to ${formatDate(booking.trip?.checkOutDate)}`}
                  </p>
                  <p className="price">${booking.trip?.price || 'N/A'}</p>
                  <p className="status">
                    Status: <span className={booking.status}>{booking.status}</span>
                  </p>
                  <p className="booking-date">
                    Booked on: {formatDate(booking.bookingDate)}
                  </p>
                </div>
                <div className="booking-actions">
                  <button 
                    className="info-button"
                    onClick={() => showDetails(booking)}
                    title="View Details"
                  >
                    <FaInfoCircle />
                  </button>
                  <button 
                    className="print-button"
                    onClick={() => printBooking(booking)}
                    title="Print"
                  >
                    <FaPrint />
                  </button>
                  <button 
                    className="cancel-button"
                    onClick={() => onCancelBooking(booking.id)}
                    title="Cancel Booking"
                    disabled={booking.status === 'cancelled'}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookingManagement;