package com.travelmate.travel_mate_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WelcomeController {

    @GetMapping("/welcome")
    public String getWelcomeMessage() {
        return "Welcome to the Spring Boot Backend!";
    }
}
