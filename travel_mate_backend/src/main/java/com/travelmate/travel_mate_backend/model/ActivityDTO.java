package com.travelmate.travel_mate_backend.model;

import java.util.List;

public class ActivityDTO {
    private String id;
    private String name;
    private List<Double> position;
    private String type;
    private Integer duration;
    private String startTime;
    private String notes;

    // Constructors
    public ActivityDTO() {
    }

    public ActivityDTO(String id, String name, List<Double> position, String type, Integer duration, String startTime, String notes) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.type = type;
        this.duration = duration;
        this.startTime = startTime;
        this.notes = notes;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Double> getPosition() {
        return position;
    }

    public void setPosition(List<Double> position) {
        this.position = position;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "ActivityDTO{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", position=" + position +
                ", type='" + type + '\'' +
                ", duration=" + duration +
                ", startTime='" + startTime + '\'' +
                ", notes='" + notes + '\'' +
                '}';
    }
}
