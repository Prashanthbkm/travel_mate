import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

const EventRecommendations = ({ destination, startDate, endDate, events, loading, error }) => {
  if (!destination || !startDate || !endDate) return null;

  if (loading) return <div className="event-recommendations loading">Loading events...</div>;
  if (error) return <div className="event-recommendations error">Error: {error}</div>;
  if (!events || events.length === 0) return (
    <div className="event-recommendations">
      <h3>No events found in {destination} during your stay</h3>
    </div>
  );

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-recommendations">
      <h3>Events in {destination} During Your Stay</h3>
      <p className="date-range">
        {formatDate(startDate)} to {formatDate(endDate)}
      </p>
      
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            {event.logo && (
              <div className="event-image-container">
                <img 
                  src={event.logo.url} 
                  alt={event.name.text} 
                  className="event-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x150?text=Event+Image';
                  }}
                />
              </div>
            )}
            <div className="event-content">
              <h4>{event.name.text}</h4>
              
              <div className="event-meta">
                <span className="event-date">
                  <FaCalendarAlt /> {formatDate(event.start.local)}
                </span>
                {event.venue && (
                  <span className="event-venue">
                    <FaMapMarkerAlt /> {event.venue.name}, {event.venue.address.city}
                  </span>
                )}
              </div>
              
              <div className="event-description">
                {event.description.text.substring(0, 150)}...
              </div>
              
              <div className="event-actions">
                <a 
                  href={event.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="event-link"
                >
                  <FaTicketAlt /> Get Tickets
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventRecommendations;