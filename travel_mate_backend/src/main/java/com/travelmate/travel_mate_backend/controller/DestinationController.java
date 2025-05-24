package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.model.Destination;
import com.travelmate.travel_mate_backend.service.DestinationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping
    public List<Destination> getAllDestinations() {
        return destinationService.getAllDestinations();
    }

    @PostMapping
    public Destination addDestination(@Valid @RequestBody Destination destination) {
        return destinationService.saveDestination(destination);
    }
}
