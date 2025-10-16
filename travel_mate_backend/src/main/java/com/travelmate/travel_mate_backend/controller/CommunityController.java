package com.travelmate.travel_mate_backend.controller;

import com.travelmate.travel_mate_backend.model.CommunityPost;
import com.travelmate.travel_mate_backend.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @GetMapping
    public List<CommunityPost> getAllPosts() {
        return communityService.getAllPosts();
    }

    @PostMapping
    public CommunityPost createPost(@RequestBody CommunityPost post) {
        return communityService.savePost(post);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunityPost> getPostById(@PathVariable Long id) {
        Optional<CommunityPost> post = communityService.getPostById(id);
        return post.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        communityService.deletePost(id);
        return ResponseEntity.ok().build();
    }
}