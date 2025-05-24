import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherService';

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        if (city) {
          const data = await fetchWeatherData(city);
          setWeather(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      getWeather();
    }, 500); // Debounce to avoid rapid API calls

    return () => clearTimeout(timer);
  }, [city]);

  return { weather, loading, error };
};