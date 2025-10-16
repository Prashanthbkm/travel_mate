import { useState, useEffect } from 'react';
import axios from 'axios';

const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) {
      setLoading(false);
      setWeather(null);
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🌤️ Fetching weather data for:', city);

        // STEP 1: First get coordinates for the city
        const geocodeResponse = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );

        console.log('📍 Geocoding response:', geocodeResponse.data);

        if (!geocodeResponse.data.results || geocodeResponse.data.results.length === 0) {
          throw new Error(`City "${city}" not found`);
        }

        const location = geocodeResponse.data.results[0];
        const { latitude, longitude, name } = location;

        console.log(`📍 Found ${name} at ${latitude}, ${longitude}`);

        // STEP 2: Get weather data for those coordinates
        const weatherResponse = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,is_day&daily=sunrise,sunset&timezone=auto`
        );

        console.log('✅ Weather API response:', weatherResponse.data);

        if (weatherResponse.data && weatherResponse.data.current) {
          const current = weatherResponse.data.current;
          const daily = weatherResponse.data.daily;
          
          // Format sunrise and sunset times
          const sunriseTime = daily.sunrise ? new Date(daily.sunrise[0]).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }) : '06:45 AM';
          
          const sunsetTime = daily.sunset ? new Date(daily.sunset[0]).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }) : '07:30 PM';

          // Map the API response to your expected format
          const weatherData = {
            main: {
              temp: current.temperature_2m,
              feels_like: current.apparent_temperature,
              humidity: current.relative_humidity_2m,
              pressure: current.pressure_msl
            },
            weather: [{
              main: getWeatherCondition(current.weather_code),
              description: getWeatherDescription(current.weather_code),
              icon: getWeatherIconCode(current.weather_code, current.is_day)
            }],
            wind: {
              speed: current.wind_speed_10m
            },
            name: name || city,
            sys: {
              sunrise: Math.floor(Date.now() / 1000) - 3600,
              sunset: Math.floor(Date.now() / 1000) + 36000
            },
            sunrise: sunriseTime,
            sunset: sunsetTime,
            iconUrl: getWeatherIconUrl(current.weather_code, current.is_day)
          };
          
          setWeather(weatherData);
          console.log('✅ WEATHER DATA LOADED for', name + ':', weatherData);
        }
        
      } catch (err) {
        console.error('❌ Weather API error:', err.message);
        setError(err.message || 'Weather service temporarily unavailable. Using demo data.');
        
        // Fallback to realistic mock data
        const mockWeather = generateRealisticWeather(city);
        setWeather(mockWeather);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city]);

  return { weather, loading, error };
};

// Helper functions for weather code mapping
const getWeatherCondition = (code) => {
  const conditions = {
    0: 'Clear', 1: 'Clear', 2: 'Clouds', 3: 'Clouds',
    45: 'Mist', 48: 'Mist', 51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle',
    61: 'Rain', 63: 'Rain', 65: 'Rain', 80: 'Rain', 81: 'Rain', 82: 'Rain',
    71: 'Snow', 73: 'Snow', 75: 'Snow', 85: 'Snow', 86: 'Snow',
    95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
  };
  return conditions[code] || 'Clear';
};

const getWeatherDescription = (code) => {
  const descriptions = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail'
  };
  return descriptions[code] || 'Clear';
};

const getWeatherIconCode = (code, isDay = 1) => {
  const dayNight = isDay ? 'd' : 'n';
  const icons = {
    0: `01${dayNight}`, 1: `02${dayNight}`, 2: `03${dayNight}`, 3: `04${dayNight}`,
    45: '50d', 48: '50d', 51: `09${dayNight}`, 53: `09${dayNight}`, 55: `09${dayNight}`,
    61: `10${dayNight}`, 63: `10${dayNight}`, 65: `10${dayNight}`,
    71: `13${dayNight}`, 73: `13${dayNight}`, 75: `13${dayNight}`,
    95: `11${dayNight}`, 96: `11${dayNight}`, 99: `11${dayNight}`
  };
  return icons[code] || `01${dayNight}`;
};

const getWeatherIconUrl = (code, isDay = 1) => {
  const iconCode = getWeatherIconCode(code, isDay);
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Generate realistic weather data based on city and season
const generateRealisticWeather = (city) => {
  const now = new Date();
  const month = now.getMonth();
  const isWinter = month >= 11 || month <= 2;
  const isSummer = month >= 5 && month <= 8;
  
  // Different weather patterns based on city and season
  const cityTemperatures = {
    'New York': isWinter ? { min: -5, max: 5 } : isSummer ? { min: 20, max: 30 } : { min: 10, max: 20 },
    'London': isWinter ? { min: 0, max: 8 } : isSummer ? { min: 15, max: 25 } : { min: 8, max: 15 },
    'Paris': isWinter ? { min: 0, max: 10 } : isSummer ? { min: 18, max: 28 } : { min: 10, max: 18 },
    'Tokyo': isWinter ? { min: 2, max: 12 } : isSummer ? { min: 22, max: 32 } : { min: 12, max: 22 },
    'Sydney': isWinter ? { min: 8, max: 18 } : isSummer ? { min: 20, max: 30 } : { min: 15, max: 25 },
    'Dubai': { min: 25, max: 45 },
    'Bangalore': { min: 15, max: 35 },
    'Hospet': { min: 20, max: 40 },
    'Mumbai': { min: 25, max: 35 },
    'Delhi': isWinter ? { min: 5, max: 20 } : isSummer ? { min: 25, max: 45 } : { min: 15, max: 30 },
    'default': isWinter ? { min: -2, max: 8 } : isSummer ? { min: 18, max: 28 } : { min: 10, max: 20 }
  };

  const cityData = cityTemperatures[city] || cityTemperatures.default;
  const temp = Math.floor(Math.random() * (cityData.max - cityData.min + 1)) + cityData.min;
  
  const conditions = ['Clear', 'Clouds', 'Rain', 'Snow'];
  const weights = isWinter ? [0.3, 0.4, 0.2, 0.1] : [0.4, 0.3, 0.3, 0.0];
  const randomCondition = conditions[getWeightedRandom(weights)];
  
  const icons = {
    Clear: '01d',
    Clouds: '03d', 
    Rain: '10d',
    Snow: '13d'
  };

  return {
    main: {
      temp: temp,
      feels_like: temp - (randomCondition === 'Rain' ? 3 : randomCondition === 'Snow' ? 5 : 0),
      humidity: Math.floor(Math.random() * 40) + 40,
      pressure: Math.floor(Math.random() * 100) + 1000
    },
    weather: [{
      main: randomCondition,
      description: `${randomCondition.toLowerCase()} conditions`,
      icon: icons[randomCondition]
    }],
    wind: {
      speed: (Math.random() * 8 + 2).toFixed(1)
    },
    name: city,
    sys: {
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 36000
    },
    sunrise: '06:45 AM',
    sunset: '07:30 PM',
    iconUrl: `https://openweathermap.org/img/wn/${icons[randomCondition]}@2x.png`
  };
};

const getWeightedRandom = (weights) => {
  const random = Math.random();
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random <= sum) return i;
  }
  return weights.length - 1;
};

export default useWeather;