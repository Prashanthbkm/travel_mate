package com.travelmate.travel_mate_backend.service;

import com.travelmate.travel_mate_backend.model.Activity;
import com.travelmate.travel_mate_backend.model.ActivityDTO;
import com.travelmate.travel_mate_backend.model.Itinerary;
import com.travelmate.travel_mate_backend.repository.ActivityRepository;
import com.travelmate.travel_mate_backend.repository.ItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ItineraryService {

    @Autowired
    private ItineraryRepository itineraryRepository;

    @Autowired
    private ActivityRepository activityRepository;

    public List<Itinerary> getAllItineraries() {
        return itineraryRepository.findAll();
    }

    public List<Itinerary> getUserItineraries(Long userId) {
        return itineraryRepository.findByUserId(userId);
    }

    public List<Itinerary> getPublicItineraries() {
        return itineraryRepository.findByIsPublicTrue();
    }

    public Optional<Itinerary> getItineraryById(Long id) {
        return itineraryRepository.findById(id);
    }

    public Optional<Itinerary> getItineraryByShareToken(String shareToken) {
        return itineraryRepository.findByShareToken(shareToken);
    }

    public Itinerary createItinerary(Itinerary itinerary) {
        return itineraryRepository.save(itinerary);
    }

    public Itinerary updateItinerary(Long id, Itinerary itineraryDetails) {
        return itineraryRepository.findById(id).map(itinerary -> {
            itinerary.setTitle(itineraryDetails.getTitle());
            itinerary.setDescription(itineraryDetails.getDescription());
            itinerary.setIsPublic(itineraryDetails.getIsPublic());
            return itineraryRepository.save(itinerary);
        }).orElseThrow(() -> new RuntimeException("Itinerary not found"));
    }

    @Transactional
    public Itinerary updateItineraryActivities(Long id, List<ActivityDTO> activityDTOs) {
        Itinerary itinerary = itineraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        // Remove existing activities
        activityRepository.deleteByItineraryId(id);

        // Add new activities with proper order
        for (int i = 0; i < activityDTOs.size(); i++) {
            ActivityDTO dto = activityDTOs.get(i);
            Activity activity = new Activity();

            // Map fields from DTO to Entity
            activity.setName(dto.getName());
            // Convert the [lat, lng] array to separate fields
            if (dto.getPosition() != null && dto.getPosition().size() == 2) {
                activity.setLatitude(dto.getPosition().get(0));
                activity.setLongitude(dto.getPosition().get(1));
            }
            activity.setType(dto.getType());
            activity.setDuration(dto.getDuration());
            activity.setStartTime(dto.getStartTime());
            activity.setNotes(dto.getNotes());
            activity.setOrderIndex(i);
            activity.setItinerary(itinerary);

            activityRepository.save(activity);
        }

        // Return the updated itinerary
        return itineraryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary not found after update"));
    }

    public void deleteItinerary(Long id) {
        itineraryRepository.deleteById(id);
    }

    public Itinerary generateShareLink(Long id) {
        return itineraryRepository.findById(id).map(itinerary -> {
            itinerary.generateShareToken();
            return itineraryRepository.save(itinerary);
        }).orElseThrow(() -> new RuntimeException("Itinerary not found"));
    }

    public List<Itinerary> searchItineraries(String query) {
        return itineraryRepository.searchByQuery(query);
    }

    public boolean userCanEditItinerary(Long itineraryId, Long userId) {
        return itineraryRepository.existsByIdAndUserId(itineraryId, userId);
    }
}