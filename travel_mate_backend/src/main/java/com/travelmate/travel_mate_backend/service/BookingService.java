package com.travelmate.travel_mate_backend.service;

import com.travelmate.travel_mate_backend.model.Booking;
import com.travelmate.travel_mate_backend.model.Trip;
import com.travelmate.travel_mate_backend.model.User;
import com.travelmate.travel_mate_backend.repository.BookingRepository;
import com.travelmate.travel_mate_backend.repository.TripRepository;
import com.travelmate.travel_mate_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TripRepository tripRepository;

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking createBooking(Long userId, Long tripId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Trip> tripOpt = tripRepository.findById(tripId);

        if (userOpt.isPresent() && tripOpt.isPresent()) {
            Booking booking = new Booking();
            booking.setBookingDate(LocalDate.now());
            booking.setStatus("confirmed");
            booking.setUser(userOpt.get());
            booking.setTrip(tripOpt.get());

            return bookingRepository.save(booking);
        }
        throw new RuntimeException("User or Trip not found");
    }

    public void cancelBooking(Long bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus("cancelled");
            bookingRepository.save(booking);
        }
    }

    public long getBookingsCountByDate(LocalDate date) {
        return bookingRepository.countByBookingDate(date);
    }
}