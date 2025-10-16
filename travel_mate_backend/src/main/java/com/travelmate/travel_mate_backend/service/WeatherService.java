package com.travelmate.travel_mate_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class WeatherService {

    @Value("${openweather.api.key:}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable(value = "weather", key = "#city")
    public Map<String, Object> getWeatherData(String city) {
        try {
            if (apiKey == null || apiKey.isEmpty()) {
                return getMockWeatherData(city);
            }

            String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
                    + "&units=metric";
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            return transformWeatherResponse(response, city);

        } catch (Exception e) {
            return getMockWeatherData(city);
        }
    }

    private Map<String, Object> transformWeatherResponse(Map<String, Object> response, String city) {
        Map<String, Object> weatherData = new HashMap<>();

        if (response != null && response.containsKey("main") && response.containsKey("weather")) {
            Map<String, Object> main = (Map<String, Object>) response.get("main");
            Map<String, Object> weather = (Map<String, Object>) ((java.util.List<?>) response.get("weather")).get(0);

            weatherData.put("temperature", main.get("temp"));
            weatherData.put("feelsLike", main.get("feels_like"));
            weatherData.put("humidity", main.get("humidity"));
            weatherData.put("pressure", main.get("pressure"));
            weatherData.put("description", weather.get("description"));
            weatherData.put("main", weather.get("main"));
            weatherData.put("city", response.get("name"));
            weatherData.put("country", ((Map<String, Object>) response.get("sys")).get("country"));

            if (response.containsKey("wind")) {
                Map<String, Object> wind = (Map<String, Object>) response.get("wind");
                weatherData.put("windSpeed", wind.get("speed"));
            }

            weatherData.put("isRealData", true);
        }

        return weatherData;
    }

    private Map<String, Object> getMockWeatherData(String city) {
        Map<String, Object> mockData = new HashMap<>();
        mockData.put("temperature", 22.5);
        mockData.put("feelsLike", 23.0);
        mockData.put("humidity", 65);
        mockData.put("pressure", 1013);
        mockData.put("description", "clear sky");
        mockData.put("main", "Clear");
        mockData.put("city", city);
        mockData.put("country", "US");
        mockData.put("windSpeed", 3.5);
        mockData.put("isRealData", false);
        return mockData;
    }

    @CacheEvict(value = "weather", key = "#city")
    public void clearWeatherCache(String city) {
        // Cache cleared by annotation
    }
}