package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.service.EventService;
import com.travelmate.travel_mate_backend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/realtime")
@CrossOrigin(origins = "*")
public class RealTimeDataController {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private EventService eventService;

    @GetMapping("/weather/{city}")
    public Map<String, Object> getWeather(@PathVariable String city) {
        return weatherService.getWeatherData(city);
    }

    @GetMapping("/events/{location}")
    public List<Map<String, Object>> getEvents(@PathVariable String location) {
        return eventService.getEvents(location);
    }

    @GetMapping("/weather/{city}/refresh")
    public Map<String, Object> refreshWeather(@PathVariable String city) {
        weatherService.clearWeatherCache(city);
        return weatherService.getWeatherData(city);
    }

    @GetMapping("/health")
    public Map<String, Object> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("timestamp", new Date());
        response.put("services", Arrays.asList("weather", "events"));
        return response;
    }
}