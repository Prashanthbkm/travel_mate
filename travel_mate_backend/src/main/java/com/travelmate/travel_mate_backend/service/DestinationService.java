package com.travelmate.travel_mate_backend.service;


import org.springframework.stereotype.Service;

import com.travelmate.travel_mate_backend.model.Destination;
import com.travelmate.travel_mate_backend.repository.DestinationRepository;

import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;

    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Destination saveDestination(Destination destination) {
        return destinationRepository.save(destination);
    }
}
