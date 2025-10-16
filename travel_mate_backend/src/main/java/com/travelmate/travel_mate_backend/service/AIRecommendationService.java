// package com.travelmate.travel_mate_backend.service;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.*;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;
// import java.util.HashMap;
// import java.util.Map;

// @Service
// public class AIRecommendationService {

//     @Value("${openai.api.key}")
//     private String openaiApiKey;

//     @Value("${openai.api.url}")
//     private String openaiApiUrl;

//     private final RestTemplate restTemplate = new RestTemplate();

//     public String getAIRecommendations(String destination, String interests) {
//         String prompt = String.format(
//                 "Suggest travel activities for %s focusing on %s. " +
//                         "Return as JSON array with name, type, and description.",
//                 destination, interests);

//         // Prepare headers
//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_JSON);
//         headers.setBearerAuth(openaiApiKey);

//         // Prepare request body
//         Map<String, Object> requestBody = new HashMap<>();
//         requestBody.put("model", "gpt-4o-mini"); // You can change to gpt-4o or gpt-3.5-turbo
//         requestBody.put("messages", new Object[] {
//                 new HashMap<String, String>() {
//                     {
//                         put("role", "system");
//                         put("content", "You are a travel recommendation assistant.");
//                     }
//                 },
//                 new HashMap<String, String>() {
//                     {
//                         put("role", "user");
//                         put("content", prompt);
//                     }
//                 }
//         });
//         requestBody.put("temperature", 0.7);

//         HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

//         try {
//             ResponseEntity<Map> response = restTemplate.exchange(
//                     openaiApiUrl,
//                     HttpMethod.POST,
//                     entity,
//                     Map.class);

//             if (response.getBody() != null) {
//                 // Extract response text from choices
//                 Object choices = response.getBody().get("choices");
//                 if (choices instanceof java.util.List<?> list && !list.isEmpty()) {
//                     Map<String, Object> firstChoice = (Map<String, Object>) list.get(0);
//                     Map<String, Object> message = (Map<String, Object>) firstChoice.get("message");
//                     return message.get("content").toString();
//                 }
//             }
//             return getMockRecommendations(destination); // fallback

//         } catch (Exception e) {
//             e.printStackTrace();
//             return getMockRecommendations(destination); // fallback on error
//         }
//     }

//     private String getMockRecommendations(String destination) {
//         // Fallback mock recommendations
//         return """
//                 [
//                     {"name": "Local Museum", "type": "attraction", "description": "Explore local history"},
//                     {"name": "Traditional Restaurant", "type": "restaurant", "description": "Taste local cuisine"}
//                 ]
//                 """;
//     }
// }
