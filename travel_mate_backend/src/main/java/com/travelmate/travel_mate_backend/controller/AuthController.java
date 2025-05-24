package com.travelmate.travel_mate_backend.controller;

import org.springframework.web.bind.annotation.*;

import com.travelmate.travel_mate_backend.model.User;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        // Mock signup logic
        return "User signed up successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        // Mock login logic
        return "User logged in successfully";
    }
}
