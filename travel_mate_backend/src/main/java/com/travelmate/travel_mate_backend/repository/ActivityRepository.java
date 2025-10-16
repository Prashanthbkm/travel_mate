package com.travelmate.travel_mate_backend.repository;

import com.travelmate.travel_mate_backend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByItineraryId(Long itineraryId);

    void deleteByItineraryId(Long itineraryId);
}