import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaStar } from 'react-icons/fa';
import '../styles/EventsList.css';

const EventsList = ({ events, loading, error, destination, dateRange }) => {
  if (loading) return (
    <div className="events-list loading">
      <div className="loader"></div>
      <p>Loading events...</p>
    </div>
  );

  if (error) return (
    <div className="events-list error">
      <p>⚠️ Error loading events</p>
      <p className="error-message">{error}</p>
    </div>
  );

  if (!destination) return (
    <div className="events-list">
      <p>Select a destination to view local events</p>
    </div>
  );

  if (events.length === 0) return (
    <div className="events-list">
      <h3>Events in {destination}</h3>
      {dateRange && <p className="date-range">{dateRange}</p>}
      <p className="no-events">No upcoming events found for this destination.</p>
    </div>
  );

  return (
    <div className="events-list">
      <h3>Events in {destination}</h3>
      {dateRange && <p className="date-range">{dateRange}</p>}
      
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image-container">
              {event.logo ? (
                <img 
                  src={event.logo.url} 
                  alt={event.name.text} 
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
              {event.isFree && <div className="free-badge">FREE</div>}
            </div>
            
            <div className="event-content">
              <div className="event-header">
                <h4>{event.name.text}</h4>
                {event.category && (
                  <span className="event-category">{event.category}</span>
                )}
              </div>
              
              <div className="event-meta">
                <span className="event-date">
                  <FaCalendarAlt /> {event.formattedDate}
                </span>
                {event.venue && (
                  <span className="event-venue">
                    <FaMapMarkerAlt /> {event.venue.name || 'Various locations'}
                  </span>
                )}
              </div>
              
              {event.description && (
                <div className="event-description">
                  {event.description.text.substring(0, 150)}...
                </div>
              )}
              
              <div className="event-actions">
                <a 
                  href={event.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="event-link"
                >
                  <FaTicketAlt /> {event.isFree ? 'Register' : 'Get Tickets'}
                </a>
                {event.venue && event.venue.latitude && (
                  <a
                    href={`https://www.google.com/maps?q=${event.venue.latitude},${event.venue.longitude}`}
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
        ))}
      </div>
    </div>
  );
};

export default EventsList;