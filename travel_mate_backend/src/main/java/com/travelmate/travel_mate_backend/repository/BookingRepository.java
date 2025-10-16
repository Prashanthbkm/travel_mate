package com.travelmate.travel_mate_backend.repository;

import com.travelmate.travel_mate_backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    long countByBookingDate(LocalDate bookingDate);

    List<Booking> findByUserId(Long userId);
}