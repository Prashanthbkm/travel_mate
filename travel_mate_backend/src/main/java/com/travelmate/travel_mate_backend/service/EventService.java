package com.travelmate.travel_mate_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.cache.annotation.Cacheable;
import java.util.*;

@Service
public class EventService {

    @Value("${eventbrite.api.key:}")
    private String eventbriteApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable(value = "events", key = "#location")
    public List<Map<String, Object>> getEvents(String location) {
        try {
            if (eventbriteApiKey == null || eventbriteApiKey.isEmpty()) {
                return getMockEvents(location);
            }

            // Eventbrite API call would go here
            // For now, we'll use mock data as fallback
            return getMockEvents(location);

        } catch (Exception e) {
            return getMockEvents(location);
        }
    }

    private List<Map<String, Object>> getMockEvents(String location) {
        List<Map<String, Object>> events = new ArrayList<>();

        // Event 1
        events.add(createEvent(
                "1",
                "Music Festival in " + location,
                "Annual music festival featuring local artists and international performers. Enjoy live music, food trucks, and great atmosphere.",
                "https://example.com/music-festival",
                new Date(System.currentTimeMillis() + 86400000 * 7), // 7 days from now
                location + " City Park",
                "Music",
                49.99));

        // Event 2
        events.add(createEvent(
                "2",
                "Food & Wine Expo",
                "Experience the finest local cuisine and wines. Meet top chefs and winemakers from the region.",
                "https://example.com/food-wine",
                new Date(System.currentTimeMillis() + 86400000 * 14), // 14 days from now
                "Downtown " + location,
                "Food & Drink",
                35.00));

        // Event 3
        events.add(createEvent(
                "3",
                "Art Walk",
                "Free guided tour of local art galleries and street art. Perfect for art enthusiasts and tourists.",
                "https://example.com/art-walk",
                new Date(System.currentTimeMillis() + 86400000 * 3), // 3 days from now
                location + " Arts District",
                "Art",
                0.00));

        return events;
    }

    private Map<String, Object> createEvent(String id, String name, String description,
            String url, Date date, String venue,
            String category, double price) {
        Map<String, Object> event = new HashMap<>();
        event.put("id", id);
        event.put("name", name);
        event.put("description", description);
        event.put("url", url);
        event.put("date", date);
        event.put("formattedDate", formatDate(date));
        event.put("venue", venue);
        event.put("category", category);
        event.put("price", price);
        event.put("isFree", price == 0.00);
        event.put("isRealData", false);
        return event;
    }

    private String formatDate(Date date) {
        return new java.text.SimpleDateFormat("EEE, MMM d, yyyy 'at' h:mm a").format(date);
    }
}