import React from 'react';
import { FaPlane, FaHotel, FaTrash, FaPrint, FaEdit, FaInfoCircle } from 'react-icons/fa';

const BookingManagement = ({ bookings, onCancelBooking }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const printBooking = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      const printWindow = window.open('', '_blank');
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
              <div class="detail"><strong>Type:</strong> ${booking.type === 'flights' ? 'Flight' : 'Hotel'}</div>
              ${booking.type === 'flights' ? `
                <div class="detail"><strong>Flight:</strong> ${booking.details.airline} ${booking.details.flightNumber}</div>
                <div class="detail"><strong>Route:</strong> ${booking.details.departure}</div>
                <div class="detail"><strong>Date:</strong> ${formatDate(booking.details.date)}</div>
                <div class="detail"><strong>Time:</strong> ${booking.details.departureTime} - ${booking.details.arrivalTime}</div>
              ` : `
                <div class="detail"><strong>Hotel:</strong> ${booking.details.name}</div>
                <div class="detail"><strong>Location:</strong> ${booking.details.location}</div>
                <div class="detail"><strong>Check-in:</strong> ${formatDate(booking.details.checkIn)}</div>
                <div class="detail"><strong>Check-out:</strong> ${formatDate(booking.details.checkOut)}</div>
              `}
              <div class="detail"><strong>Status:</strong> ${booking.status}</div>
              <div class="detail"><strong>Booked on:</strong> ${formatDate(booking.bookedAt)}</div>
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
    }
  };

  const showDetails = (booking) => {
    alert(`Booking Details:\n\n${
      booking.type === 'flights' ? 
        `Flight: ${booking.details.airline} ${booking.details.flightNumber}\n` +
        `Route: ${booking.details.departure}\n` +
        `Date: ${formatDate(booking.details.date)}\n` +
        `Time: ${booking.details.departureTime} - ${booking.details.arrivalTime}\n` +
        `Duration: ${booking.details.duration}\n` +
        `Price: $${booking.details.price}`
      : 
        `Hotel: ${booking.details.name}\n` +
        `Location: ${booking.details.location}\n` +
        `Address: ${booking.details.address}\n` +
        `Check-in: ${formatDate(booking.details.checkIn)}\n` +
        `Check-out: ${formatDate(booking.details.checkOut)}\n` +
        `Rating: ${booking.details.rating}/5\n` +
        `Amenities: ${booking.details.amenities.join(', ')}\n` +
        `Price: $${booking.details.price} per night`
    }`);
  };

  return (
    <div className="booking-management">
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You don't have any bookings yet.</p>
          <p>Search and book flights or hotels to see them here.</p>
        </div>
      ) : (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <div className="booking-icon">
                {booking.type === 'flights' ? <FaPlane size={24} /> : <FaHotel size={24} />}
              </div>
              <div className="booking-details">
                <h4>
                  {booking.type === 'flights' 
                    ? `${booking.details.airline} Flight ${booking.details.flightNumber}`
                    : booking.details.name}
                </h4>
                <p>
                  {booking.type === 'flights'
                    ? `${booking.details.departure} • ${formatDate(booking.details.date)}`
                    : `${booking.details.location} • ${formatDate(booking.details.checkIn)} to ${formatDate(booking.details.checkOut)}`}
                </p>
                <p className="price">${booking.details.price}</p>
                <p className="status">
                  Status: <span className={booking.status}>{booking.status}</span>
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
                  onClick={() => printBooking(booking.id)}
                  title="Print"
                >
                  <FaPrint />
                </button>
                <button 
                  className="cancel-button"
                  onClick={() => onCancelBooking(booking.id)}
                  title="Cancel Booking"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingManagement;