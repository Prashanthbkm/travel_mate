package com.travelmate.travel_mate_backend.repository;

import com.travelmate.travel_mate_backend.model.ItineraryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItineraryItemRepository extends JpaRepository<ItineraryItem, Long> {
    List<ItineraryItem> findAllByOrderByCreatedAtAsc();
}
