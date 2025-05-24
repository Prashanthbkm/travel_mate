import { useState, useEffect } from 'react';
import { fetchEvents } from '../services/eventService';

export const useEvents = (location, startDate, endDate) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        if (location) {
          const data = await fetchEvents(location, startDate, endDate);
          setEvents(data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      getEvents();
    }, 500); // Debounce to avoid rapid API calls

    return () => clearTimeout(timer);
  }, [location, startDate, endDate]);

  return { events, loading, error };
};