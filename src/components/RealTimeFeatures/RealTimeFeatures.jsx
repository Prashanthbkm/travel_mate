import React, { useState } from 'react';
import DestinationSelector from './DestinationSelector';
import WeatherCard from './WeatherCard';
import EventsList from './EventsList';
import { useWeather } from '../../hooks/useWeather';
import { useEvents } from '../../hooks/useEvents';
import '../styles/RealTimeFeatures.css';

const RealTimeFeatures = ({ initialDestination, startDate, endDate, onDestinationSelect }) => {
  const [selectedDestination, setSelectedDestination] = useState(initialDestination || '');
  
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(selectedDestination);
  const { events, loading: eventsLoading, error: eventsError } = useEvents(
    selectedDestination, 
    startDate?.toISOString().split('T')[0], 
    endDate?.toISOString().split('T')[0]
  );

  const handleDestinationChange = (destination) => {
    setSelectedDestination(destination);
    if (onDestinationSelect) {
      onDestinationSelect(destination);
    }
  };

  return (
    <div className="real-time-features">
      <DestinationSelector 
        selectedDestination={selectedDestination}
        onSelect={handleDestinationChange}
      />
      
      <div className="features-grid">
        <div className="weather-section">
          <WeatherCard 
            weather={weather} 
            loading={weatherLoading} 
            error={weatherError} 
            destination={selectedDestination}
          />
        </div>
        
        <div className="events-section">
          <EventsList 
            events={events} 
            loading={eventsLoading} 
            error={eventsError} 
            destination={selectedDestination}
            dateRange={startDate && endDate ? 
              `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}` : null}
          />
        </div>
      </div>
    </div>
  );
};

export default RealTimeFeatures;