package com.travelmate.travel_mate_backend.service;

import com.travelmate.travel_mate_backend.model.CommunityPost;
import com.travelmate.travel_mate_backend.repository.CommunityPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CommunityService {

    @Autowired
    private CommunityPostRepository postRepository;

    public List<CommunityPost> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public CommunityPost savePost(CommunityPost post) {
        return postRepository.save(post);
    }

    public Optional<CommunityPost> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
