package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.model.Booking;
import com.travelmate.travel_mate_backend.model.Trip;
import com.travelmate.travel_mate_backend.model.User;
import com.travelmate.travel_mate_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.travelmate.travel_mate_backend.repository.TripRepository;
import com.travelmate.travel_mate_backend.repository.BookingRepository;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TripRepository tripRepo;

    @Autowired
    private BookingRepository bookingRepo;

    @GetMapping("/summary")
    public Map<String, Object> getDashboardSummary() {
        Map<String, Object> result = new HashMap<>();
        result.put("totalUsers", userRepo.count());
        result.put("totalTrips", tripRepo.count());
        result.put("totalBookings", bookingRepo.count());
        return result;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @GetMapping("/trips")
    public List<Trip> getAllTrips() {
        return tripRepo.findAll();
    }
}
