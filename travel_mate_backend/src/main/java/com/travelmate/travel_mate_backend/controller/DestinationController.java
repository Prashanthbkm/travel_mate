package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.model.Destination;
import com.travelmate.travel_mate_backend.service.DestinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    // GET all destinations
    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations() {
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

    // GET destination by ID - ADD THIS METHOD
    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        Optional<Destination> destination = destinationService.getDestinationById(id);
        return destination.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST a new destination
    @PostMapping
    public ResponseEntity<Destination> addDestination(@RequestBody Destination destination) {
        return ResponseEntity.ok(destinationService.saveDestination(destination));
    }
}