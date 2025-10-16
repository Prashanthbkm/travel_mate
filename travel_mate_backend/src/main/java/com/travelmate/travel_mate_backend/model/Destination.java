package com.travelmate.travel_mate_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import java.util.Arrays;
import java.util.List;

@Entity
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Description is mandatory")
    private String description;

    private String imageUrl;
    private String budget;
    private String weather;
    private String interests; // Store as comma-separated string

    public Destination() {
    }

    public Destination(String name, String description, String imageUrl, String budget, String weather,
            String interests) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.budget = budget;
        this.weather = weather;
        this.interests = interests;
    }

    // Getters and Setters for all fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getWeather() {
        return weather;
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    // Helper method to get interests as list
    public List<String> getInterestsList() {
        return interests != null ? Arrays.asList(interests.split(",")) : List.of();
    }
}