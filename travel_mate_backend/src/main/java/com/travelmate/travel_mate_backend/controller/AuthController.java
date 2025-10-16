package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.model.User;
import com.travelmate.travel_mate_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            // Check if user already exists
            Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
            if (existingUser.isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Username already exists");
                return ResponseEntity.badRequest().body(response);
            }

            // Check if email already exists
            Optional<User> existingEmail = userRepository.findByEmail(user.getEmail());
            if (existingEmail.isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Email already exists");
                return ResponseEntity.badRequest().body(response);
            }

            // Save new user
            User savedUser = userRepository.save(user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("userId", savedUser.getId());
            response.put("username", savedUser.getUsername());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Registration failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            // Find user by username
            Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

            if (userOpt.isPresent()) {
                User user = userOpt.get();

                // Check password (in real app, use password encoding!)
                if (user.getPassword().equals(loginRequest.getPassword())) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Login successful");
                    response.put("userId", user.getId());
                    response.put("username", user.getUsername());
                    response.put("email", user.getEmail());

                    return ResponseEntity.ok(response);
                } else {
                    Map<String, String> response = new HashMap<>();
                    response.put("error", "Invalid password");
                    return ResponseEntity.badRequest().body(response);
                }
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("error", "User not found");
                return ResponseEntity.badRequest().body(response);
            }

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Login failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Additional method to get user profile
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "User not found");
            return ResponseEntity.notFound().build();
        }
    }
}