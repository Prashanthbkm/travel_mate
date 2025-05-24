const API_KEY = import.meta.env.VITE_EVENTBRITE_API_KEY;
const BASE_URL = 'https://www.eventbriteapi.com/v3';

const categories = {
  '103': 'Music',
  '105': 'Performing & Visual Arts',
  '110': 'Food & Drink',
  '113': 'Community & Culture',
  '116': 'Sports & Fitness',
  '119': 'Travel & Outdoor',
  '199': 'Other'
};

export const fetchEvents = async (location, startDate, endDate) => {
  try {
    let url = `${BASE_URL}/events/search/?location.address=${location}&expand=venue,organizer`;

    if (startDate && endDate) {
      url += `&start_date.range_start=${startDate}T00:00:00&start_date.range_end=${endDate}T23:59:59`;
    }

    const response = await fetch(`${url}&token=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data = await response.json();

    return data.events.map(event => ({
      ...event,
      formattedDate: new Date(event.start.local).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isFree: event.is_free || false,
      category: event.category_id ? categories[event.category_id] || 'General' : 'General'
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
