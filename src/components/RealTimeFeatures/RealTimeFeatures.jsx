import React, { useState } from 'react';
import DestinationSelector from './DestinationSelector';
import WeatherCard from './WeatherCard';
import EventsList from './EventsList';
import useWeather from '../../hooks/useWeather';
import { useEvents } from '../../hooks/useEvents';
import '../styles/RealTimeFeatures.css';

const RealTimeFeatures = ({ initialDestination, startDate, endDate, onDestinationSelect }) => {
  const [selectedDestination, setSelectedDestination] = useState(initialDestination || '');
  
  console.log('=== REAL TIME FEATURES DEBUG ===');
  console.log('Selected Destination:', selectedDestination);
  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);

  const formatDateSafe = (date) => {
    if (!date) {
      console.log('No date provided to formatDateSafe');
      return null;
    }
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      const result = dateObj.toISOString().split('T')[0];
      console.log('Formatted date:', date, '->', result);
      return result;
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  // Use the hooks
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(selectedDestination);
  const { events, loading: eventsLoading, error: eventsError } = useEvents(
    selectedDestination, 
    formatDateSafe(startDate), 
    formatDateSafe(endDate)
  );

  console.log('=== HOOKS DATA ===');
  console.log('Weather:', { data: weather, loading: weatherLoading, error: weatherError });
  console.log('Events:', { data: events, loading: eventsLoading, error: eventsError });

  const handleDestinationChange = (destination) => {
    console.log('🔄 Destination changed to:', destination);
    setSelectedDestination(destination);
    if (onDestinationSelect) {
      onDestinationSelect(destination);
    }
  };

  // SIMPLE TEST - Always show something visible
  return (
    <div className="real-time-features" style={{ border: '2px solid red', padding: '20px' }}>
      <h2 className="section-title" style={{ color: 'blue' }}>Real-Time Travel Information</h2>
      
      <DestinationSelector 
        selectedDestination={selectedDestination}
        onSelect={handleDestinationChange}
      />
      
      {/* DEBUG INFO */}
      <div style={{ 
        background: '#fff3cd', 
        padding: '10px', 
        margin: '10px 0', 
        border: '1px solid #ffeaa7',
        borderRadius: '5px'
      }}>
        <strong>Debug Info:</strong> Destination = "{selectedDestination}" | 
        Weather Loading: {weatherLoading ? 'YES' : 'NO'} | 
        Events Loading: {eventsLoading ? 'YES' : 'NO'}
      </div>

      {selectedDestination ? (
        <div style={{ border: '2px solid green', padding: '15px', marginTop: '20px' }}>
          <h3 style={{ color: 'green' }}>✅ CONTENT AREA - Should be visible when destination is selected</h3>
          
          <div className="features-grid">
            {/* WEATHER - Force visible test */}
            <div className="weather-section" style={{ border: '1px solid orange', padding: '15px' }}>
              <h4>🌤️ Weather Section</h4>
              <div style={{ background: '#e8f4fd', padding: '10px', borderRadius: '5px' }}>
                <strong>Weather Data:</strong> 
                {weatherLoading && ' ⏳ Loading...'}
                {weatherError && ` ❌ Error: ${weatherError}`}
                {weather && ` ✅ Loaded: ${weather.name || selectedDestination}`}
                {!weather && !weatherLoading && !weatherError && ' ⚠️ No data'}
              </div>
              <WeatherCard 
                weather={weather} 
                loading={weatherLoading} 
                error={weatherError} 
                destination={selectedDestination}
              />
            </div>
            
            {/* EVENTS - Force visible test */}
            <div className="events-section" style={{ border: '1px solid purple', padding: '15px' }}>
              <h4>🎭 Events Section</h4>
              <div style={{ background: '#f0e8ff', padding: '10px', borderRadius: '5px' }}>
                <strong>Events Data:</strong> 
                {eventsLoading && ' ⏳ Loading...'}
                {eventsError && ` ❌ Error: ${eventsError}`}
                {events && ` ✅ Loaded: ${events.length} events`}
                {!events && !eventsLoading && !eventsError && ' ⚠️ No data'}
              </div>
              <EventsList 
                events={events} 
                loading={eventsLoading} 
                error={eventsError} 
                destination={selectedDestination}
                dateRange={startDate && endDate ? 
                  `${startDate} to ${endDate}` : 
                  'Upcoming Events'
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ 
          border: '2px dashed #ccc', 
          padding: '40px', 
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <h3 style={{ color: '#666' }}>🌍 No Destination Selected</h3>
          <p>Please select a destination from above to see real-time information</p>
        </div>
      )}
    </div>
  );
};

export default RealTimeFeatures;