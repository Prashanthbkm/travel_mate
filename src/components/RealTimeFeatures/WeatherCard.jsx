import React from 'react';
import '../styles/WeatherCard.css';

const WeatherCard = ({ weather, loading, error, destination }) => {
  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Snow: '❄️',
      Thunderstorm: '⛈️',
      Drizzle: '🌦️',
      Mist: '🌫️'
    };
    return icons[condition] || '🌈';
  };

  if (loading) return (
    <div className="weather-card loading">
      <div className="loader"></div>
      <p>Loading weather data...</p>
    </div>
  );

  if (error) return (
    <div className="weather-card error">
      <p>⚠️ Error loading weather data</p>
      <p className="error-message">{error}</p>
    </div>
  );

  if (!weather) return (
    <div className="weather-card">
      <p>Select a destination to view weather information</p>
    </div>
  );

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h3>{destination}</h3>
        <div className="current-conditions">
          <div className="temperature">
            {Math.round(weather.main.temp)}°C
            <span className="feels-like">
              Feels like {Math.round(weather.main.feels_like)}°C
            </span>
          </div>
          <div className="weather-icon">
            <img src={weather.iconUrl} alt={weather.weather[0].description} />
            <span>{weather.weather[0].main} {getWeatherIcon(weather.weather[0].main)}</span>
          </div>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-row">
          <span className="detail-label">Forecast:</span>
          <span className="detail-value">{weather.forecast}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{weather.main.humidity}%</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Wind:</span>
          <span className="detail-value">{weather.wind.speed} m/s</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Pressure:</span>
          <span className="detail-value">{weather.main.pressure} hPa</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Sunrise:</span>
          <span className="detail-value">{weather.sunrise}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Sunset:</span>
          <span className="detail-value">{weather.sunset}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;