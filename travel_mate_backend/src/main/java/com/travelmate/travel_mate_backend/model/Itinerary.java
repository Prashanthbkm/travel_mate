package com.travelmate.travel_mate_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "itineraries")
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is mandatory")
    private String title;

    private String description;

    // ADD BACK the user relationship
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Activity> activities = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isPublic = false;
    private String shareToken;

    // Constructors
    public Itinerary() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Itinerary(String title, String description) {
        this();
        this.title = title;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
        this.updatedAt = LocalDateTime.now();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    // ADD BACK user getter/setter
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        this.updatedAt = LocalDateTime.now();
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
        this.updatedAt = LocalDateTime.now();
    }

    public String getShareToken() {
        return shareToken;
    }

    public void setShareToken(String shareToken) {
        this.shareToken = shareToken;
        this.updatedAt = LocalDateTime.now();
    }

    // Helper methods
    public void addActivity(Activity activity) {
        activities.add(activity);
        activity.setItinerary(this);
        this.updatedAt = LocalDateTime.now();
    }

    public void removeActivity(Activity activity) {
        activities.remove(activity);
        activity.setItinerary(null);
        this.updatedAt = LocalDateTime.now();
    }

    public void generateShareToken() {
        this.shareToken = java.util.UUID.randomUUID().toString();
        this.updatedAt = LocalDateTime.now();
    }
}