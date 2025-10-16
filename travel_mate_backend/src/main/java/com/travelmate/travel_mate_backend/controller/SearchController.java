package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.model.Flight;
import com.travelmate.travel_mate_backend.model.Hotel;
import com.travelmate.travel_mate_backend.model.Trip;
import com.travelmate.travel_mate_backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "*")
public class SearchController {

    @Autowired
    private SearchService searchService;

    // Search all trips (flights + hotels)
    @GetMapping("/all")
    public List<Trip> searchAll(@RequestParam String destination) {
        return searchService.searchAllTrips(destination);
    }

    // Search only flights
    @GetMapping("/flights")
    public List<Trip> searchFlights(@RequestParam String destination) {
        return searchService.searchFlights(destination);
    }

    // Search only hotels
    @GetMapping("/hotels")
    public List<Trip> searchHotels(@RequestParam String destination) {
        return searchService.searchHotels(destination);
    }

    // Get specific flight by ID
    @GetMapping("/flights/{id}")
    public Trip getFlight(@PathVariable Long id) {
        return searchService.getFlightById(id);
    }

    // Get specific hotel by ID
    @GetMapping("/hotels/{id}")
    public Trip getHotel(@PathVariable Long id) {
        return searchService.getHotelById(id);
    }

    // Get all available destinations (for dropdowns)
    @GetMapping("/destinations")
    public List<String> getDestinations() {
        return List.of("Paris", "London", "New York", "Tokyo", "Dubai", "Sydney", "Rome", "Barcelona");
    }
}