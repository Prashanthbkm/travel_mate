package com.travelmate.travel_mate_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelmate.travel_mate_backend.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByDestinationId(Long destinationId);
    Optional<Review> findByIdAndUserId(Long id, String userId); // for update/delete
}