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
      Mist: '🌫️',
      Fog: '🌫️',
      Haze: '🌫️'
    };
    return icons[condition] || '🌈';
  };

  if (loading) return (
    <div className="weather-card loading">
      <div className="loader"></div>
      <p>Loading real weather data...</p>
    </div>
  );

  if (error) return (
    <div className="weather-card error">
      <p>⚠️ {error}</p>
      <p className="demo-notice">Please try another city or check your connection</p>
    </div>
  );

  if (!weather || !weather.main) return (
    <div className="weather-card">
      <p>No weather data available for {destination}</p>
    </div>
  );

  // Extract data from REAL API response
  const weatherArray = weather.weather || [];
  const firstWeather = weatherArray[0] || { main: 'Clear', description: 'Clear sky' };
  
  const temperature = weather.main.temp !== undefined ? Math.round(weather.main.temp) : 'N/A';
  const feelsLike = weather.main.feels_like !== undefined ? Math.round(weather.main.feels_like) : 'N/A';
  const humidity = weather.main.humidity !== undefined ? weather.main.humidity : 'N/A';
  const pressure = weather.main.pressure !== undefined ? weather.main.pressure : 'N/A';
  const windSpeed = weather.wind?.speed !== undefined ? weather.wind.speed : 'N/A';
  const visibility = weather.visibility !== undefined ? (weather.visibility / 1000).toFixed(1) : 'N/A';
  
  const sunrise = weather.sunrise || 'N/A';
  const sunset = weather.sunset || 'N/A';
  const iconUrl = weather.iconUrl || `https://openweathermap.org/img/wn/01d@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h3>{destination || weather.name || 'Unknown Location'}</h3>
        <div className="current-conditions">
          <div className="temperature">
            {temperature}°C
            <span className="feels-like">
              Feels like {feelsLike}°C
            </span>
          </div>
          <div className="weather-icon">
            <img src={iconUrl} alt={firstWeather.description} />
            <span>
              {firstWeather.main} {getWeatherIcon(firstWeather.main)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-row">
          <span className="detail-label">Conditions:</span>
          <span className="detail-value" style={{ textTransform: 'capitalize' }}>
            {firstWeather.description}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Wind Speed:</span>
          <span className="detail-value">{windSpeed} m/s</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Pressure:</span>
          <span className="detail-value">{pressure} hPa</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Visibility:</span>
          <span className="detail-value">{visibility} km</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Sunrise:</span>
          <span className="detail-value">{sunrise}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Sunset:</span>
          <span className="detail-value">{sunset}</span>
        </div>
      </div>
      
      <div className="api-notice">
        <small>🌐 Powered by OpenWeatherMap API</small>
      </div>
    </div>
  );
};

export default WeatherCard;