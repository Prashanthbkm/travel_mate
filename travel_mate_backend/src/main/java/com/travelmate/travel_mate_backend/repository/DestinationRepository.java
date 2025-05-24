package com.travelmate.travel_mate_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelmate.travel_mate_backend.model.Destination;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
}
