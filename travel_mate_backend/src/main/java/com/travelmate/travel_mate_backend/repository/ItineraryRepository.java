package com.travelmate.travel_mate_backend.repository;

import com.travelmate.travel_mate_backend.model.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

    List<Itinerary> findByUserId(Long userId);

    List<Itinerary> findByIsPublicTrue();

    Optional<Itinerary> findByShareToken(String shareToken);

    @Query("SELECT i FROM Itinerary i WHERE i.title LIKE %:query% OR i.description LIKE %:query%")
    List<Itinerary> searchByQuery(@Param("query") String query);

    boolean existsByIdAndUserId(Long id, Long userId);
}