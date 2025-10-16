import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import '../styles/EventsList.css';

const EventsList = ({ events, loading, error, destination, dateRange }) => {
  const navigate = useNavigate();

  const handleBookTickets = (event) => {
    // Redirect to your existing booking page with event info
    navigate('/booking', { 
      state: { 
        prefillEvent: event,
        message: `Booking for ${event.name?.text}`
      } 
    });
  };

  const handleExternalBooking = (eventUrl, eventName) => {
    if (eventUrl && eventUrl !== '#') {
      // Open external booking site in new tab
      window.open(eventUrl, '_blank', 'noopener,noreferrer');
    } else {
      // For demo events, redirect to your booking page
      navigate('/booking', { 
        state: { 
          message: `Book tickets for ${eventName}` 
        } 
      });
    }
  };

  if (loading) return (
    <div className="events-list loading">
      <div className="loader"></div>
      <p>Loading events in {destination}...</p>
    </div>
  );

  if (error) return (
    <div className="events-list error">
      <p>⚠️ {error}</p>
      <p className="demo-notice">Showing demo events for {destination}</p>
    </div>
  );

  if (!destination) return (
    <div className="events-list">
      <p>Select a destination to view local events</p>
    </div>
  );

  if (!events || events.length === 0) return (
    <div className="events-list">
      <h3>Events in {destination}</h3>
      {dateRange && <p className="date-range">{dateRange}</p>}
      <p className="no-events">
        No upcoming events found in {destination}. 
        <br />
        <small>Try a larger city or check back later!</small>
      </p>
    </div>
  );

  return (
    <div className="events-list">
      <h3>Events in {destination}</h3>
      {dateRange && <p className="date-range">{dateRange}</p>}
      
      <div className="events-stats">
        <small>🎭 Found {events.length} events • Click to book tickets</small>
      </div>
      
      <div className="events-grid">
        {events.map(event => {
          const eventName = event?.name?.text || 'Event';
          const eventDescription = event?.description?.text || '';
          const eventLogo = event?.logo;
          const eventVenue = event?.venue;
          const eventUrl = event?.url || '#';
          const isFree = event?.isFree || false;
          const category = event?.category || 'General';
          const formattedDate = event?.formattedDate || 'Date TBD';
          
          return (
            <div key={event.id} className="event-card">
              <div className="event-image-container">
                {eventLogo ? (
                  <img 
                    src={eventLogo.url} 
                    alt={eventName} 
                    className="event-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200?text=Event+Image';
                    }}
                  />
                ) : (
                  <div className="event-image-placeholder">
                    <FaCalendarAlt size={48} />
                  </div>
                )}
                {isFree && <div className="free-badge">FREE</div>}
                <div className="category-badge">{category}</div>
              </div>
              
              <div className="event-content">
                <div className="event-header">
                  <h4>{eventName}</h4>
                </div>
                
                <div className="event-meta">
                  <span className="event-date">
                    <FaCalendarAlt /> {formattedDate}
                  </span>
                  {eventVenue && (
                    <span className="event-venue">
                      <FaMapMarkerAlt /> {eventVenue.name || 'Various locations'}
                    </span>
                  )}
                </div>
                
                {eventDescription && (
                  <div className="event-description">
                    {eventDescription.length > 120 
                      ? `${eventDescription.substring(0, 120)}...` 
                      : eventDescription
                    }
                  </div>
                )}
                
                <div className="event-actions">
                  <button 
                    onClick={() => handleBookTickets(event)}
                    className="event-link"
                  >
                    <FaTicketAlt /> {isFree ? 'Register Now' : 'Book Tickets'}
                  </button>
                  {eventVenue && eventVenue.latitude && (
                    <a
                      href={`https://www.google.com/maps?q=${eventVenue.latitude},${eventVenue.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link"
                    >
                      View Map
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsList;