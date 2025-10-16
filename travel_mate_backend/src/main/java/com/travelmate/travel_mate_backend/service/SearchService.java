package com.travelmate.travel_mate_backend.service;

import com.travelmate.travel_mate_backend.model.Trip;
import com.travelmate.travel_mate_backend.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SearchService {

    @Autowired
    private TripRepository tripRepository;

    // Search flights by destination
    public List<Trip> searchFlights(String destination) {
        return tripRepository.findByTripTypeAndDestinationContaining("flight", destination);
    }

    // Search hotels by destination
    public List<Trip> searchHotels(String destination) {
        return tripRepository.findByTripTypeAndDestinationContaining("hotel", destination);
    }

    // General search for any trip type
    public List<Trip> searchAllTrips(String destination) {
        return tripRepository.findByDestinationContaining(destination);
    }

    // Get flight by ID
    public Trip getFlightById(Long id) {
        return tripRepository.findById(id).orElse(null);
    }

    // Get hotel by ID
    public Trip getHotelById(Long id) {
        return tripRepository.findById(id).orElse(null);
    }
}