package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.service.CarbonCalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/carbon")
@CrossOrigin(origins = "http://localhost:3000")
public class CarbonCalculatorController {
    
    @Autowired
    private CarbonCalculatorService carbonService;
    
    @PostMapping("/calculate")
    public Map<String, Object> calculateFootprint(
            @RequestParam Double distance,
            @RequestParam(defaultValue = "car") String transportMode) {
        return carbonService.calculateFootprint(distance, transportMode);
    }
    
    @GetMapping("/factors")
    public Map<String, Double> getEmissionFactors() {
        return carbonService.getEmissionFactors();
    }
}