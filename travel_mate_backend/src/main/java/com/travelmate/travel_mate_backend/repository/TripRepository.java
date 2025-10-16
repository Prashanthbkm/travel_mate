package com.travelmate.travel_mate_backend.repository;

import com.travelmate.travel_mate_backend.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByTripType(String tripType);

    List<Trip> findByDestinationContaining(String destination);

    // ADD THIS NEW METHOD:
    List<Trip> findByTripTypeAndDestinationContaining(String tripType, String destination);
}