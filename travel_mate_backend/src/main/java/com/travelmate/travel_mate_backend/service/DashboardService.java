package com.travelmate.travel_mate_backend.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelmate.travel_mate_backend.repository.BookingRepository;
import com.travelmate.travel_mate_backend.repository.TripRepository;
import com.travelmate.travel_mate_backend.repository.UserRepository;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TripRepository tripRepository;

    public long getTotalUsers() {
        return userRepository.count();
    }

    public long getTotalBookings() {
        return bookingRepository.count();
    }

    public long getTotalTrips() {
        return tripRepository.count();
    }

    public long getTodayBookings() {
        return bookingRepository.countByBookingDate(LocalDate.now());
    }
}
