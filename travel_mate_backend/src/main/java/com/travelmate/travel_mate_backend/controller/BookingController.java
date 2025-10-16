package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.model.Booking;
import com.travelmate.travel_mate_backend.model.Trip;
import com.travelmate.travel_mate_backend.model.User;
import com.travelmate.travel_mate_backend.service.BookingService;
import com.travelmate.travel_mate_backend.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private TripService tripService;

    // Get all flights
    @GetMapping("/flights")
    public List<Trip> getFlights() {
        return tripService.getFlights();
    }

    // Get all hotels
    @GetMapping("/hotels")
    public List<Trip> getHotels() {
        return tripService.getHotels();
    }

    // Search trips
    @GetMapping("/search")
    public List<Trip> searchTrips(@RequestParam String destination) {
        return tripService.searchTrips(destination);
    }

    // Get user bookings
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }

    // Create booking
    @PostMapping("/user/{userId}/trip/{tripId}")
    public ResponseEntity<Map<String, String>> createBooking(
            @PathVariable Long userId,
            @PathVariable Long tripId) {

        try {
            Booking booking = bookingService.createBooking(userId, tripId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Booking created successfully");
            response.put("bookingId", booking.getId().toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to create booking");
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Cancel booking
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Map<String, String>> cancelBooking(@PathVariable Long bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Booking cancelled successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to cancel booking");
            return ResponseEntity.badRequest().body(response);
        }
    }
}