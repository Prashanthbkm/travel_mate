package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.model.ActivityDTO;
import com.travelmate.travel_mate_backend.model.Itinerary;
import com.travelmate.travel_mate_backend.service.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/itineraries")
@CrossOrigin(origins = "*")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @GetMapping
    public List<Itinerary> getAllItineraries() {
        return itineraryService.getAllItineraries();
    }

    @GetMapping("/user/{userId}")
    public List<Itinerary> getUserItineraries(@PathVariable Long userId) {
        return itineraryService.getUserItineraries(userId);
    }

    @GetMapping("/public")
    public List<Itinerary> getPublicItineraries() {
        return itineraryService.getPublicItineraries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Itinerary> getItineraryById(@PathVariable Long id) {
        Optional<Itinerary> itinerary = itineraryService.getItineraryById(id);
        return itinerary.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/share/{token}")
    public ResponseEntity<Itinerary> getItineraryByShareToken(@PathVariable String token) {
        Optional<Itinerary> itinerary = itineraryService.getItineraryByShareToken(token);
        return itinerary.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Itinerary createItinerary(@RequestBody Itinerary itinerary) {
        return itineraryService.createItinerary(itinerary);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Itinerary> updateItinerary(@PathVariable Long id, @RequestBody Itinerary itineraryDetails) {
        try {
            Itinerary updatedItinerary = itineraryService.updateItinerary(id, itineraryDetails);
            return ResponseEntity.ok(updatedItinerary);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/activities")
    public ResponseEntity<Itinerary> updateItineraryActivities(@PathVariable Long id,
            @RequestBody List<ActivityDTO> activities) {
        try {
            Itinerary updatedItinerary = itineraryService.updateItineraryActivities(id, activities);
            return ResponseEntity.ok(updatedItinerary);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable Long id) {
        itineraryService.deleteItinerary(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/share")
    public ResponseEntity<Itinerary> generateShareLink(@PathVariable Long id) {
        try {
            Itinerary itinerary = itineraryService.generateShareLink(id);
            return ResponseEntity.ok(itinerary);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Itinerary> searchItineraries(@RequestParam String q) {
        return itineraryService.searchItineraries(q);
    }
}