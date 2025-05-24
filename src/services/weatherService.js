const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const forecasts = {
  Clear: 'Perfect day for outdoor activities',
  Clouds: 'Great day with some clouds',
  Rain: 'Don\'t forget your umbrella',
  Snow: 'Bundle up and enjoy the snow',
  Thunderstorm: 'Stay indoors if possible',
  Drizzle: 'Light rain expected',
  Mist: 'Reduced visibility, drive carefully'
};

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    return {
      ...data,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      forecast: forecasts[data.weather[0].main] || 'Weather conditions normal'
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
