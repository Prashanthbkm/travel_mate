package com.travelmate.travel_mate_backend.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class CarbonCalculatorService {

    // Carbon emission factors (kg CO2 per km)
    private final Map<String, Double> emissionFactors = new HashMap<>();

    public CarbonCalculatorService() {
        // Initialize emission factors
        emissionFactors.put("car", 0.25); // Average car
        emissionFactors.put("flight", 0.25); // Short-haul flight
        emissionFactors.put("train", 0.05); // Electric train
        emissionFactors.put("bus", 0.08); // Coach bus
        emissionFactors.put("bike", 0.0); // Bicycle
        emissionFactors.put("walk", 0.0); // Walking
    }

    public Map<String, Object> calculateFootprint(Double distance, String transportMode) {
        Double factor = emissionFactors.getOrDefault(transportMode.toLowerCase(), 0.25);
        Double footprint = distance * factor;

        Map<String, Object> result = new HashMap<>();
        result.put("footprint", Math.round(footprint * 100.0) / 100.0);
        result.put("transportMode", transportMode);
        result.put("distance", distance);
        result.put("factor", factor);
        result.put("recommendation", getRecommendation(transportMode, footprint));

        return result;
    }

    private String getRecommendation(String mode, Double footprint) {
        if (footprint > 10) {
            return "Consider using train or bus to reduce your carbon footprint!";
        } else if (footprint <= 2) {
            return "Great eco-friendly choice!";
        } else {
            return "Good choice, but there are greener options available.";
        }
    }

    public Map<String, Double> getEmissionFactors() {
        return new HashMap<>(emissionFactors);
    }
}
