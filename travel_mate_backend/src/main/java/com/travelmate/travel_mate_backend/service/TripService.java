package com.travelmate.travel_mate_backend.service;

import com.travelmate.travel_mate_backend.model.Trip;
import com.travelmate.travel_mate_backend.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public List<Trip> getFlights() {
        return tripRepository.findByTripType("flight");
    }

    public List<Trip> getHotels() {
        return tripRepository.findByTripType("hotel");
    }

    public List<Trip> searchTrips(String destination) {
        return tripRepository.findByDestinationContaining(destination);
    }

    public Trip getTripById(Long id) {
        return tripRepository.findById(id).orElse(null);
    }
}
