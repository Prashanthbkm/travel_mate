package com.travelmate.travel_mate_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelmate.travel_mate_backend.model.Review;
import com.travelmate.travel_mate_backend.repository.ReviewRepository;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByDestinationId(Long destinationId) {
        return reviewRepository.findByDestinationId(destinationId);
    }

    public Review addReview(Review review) {
        // Ensure timestamp is set
        if (review.getTimestamp() == null) {
            review.setTimestamp(LocalDateTime.now());
        }
        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, Review updatedReview) {
        return reviewRepository.findById(id)
                .map(review -> {
                    if (updatedReview.getRating() != null) {
                        review.setRating(updatedReview.getRating());
                    }
                    if (updatedReview.getComment() != null) {
                        review.setComment(updatedReview.getComment());
                    }
                    return reviewRepository.save(review);
                })
                .orElseThrow(() -> new RuntimeException("Review not found"));
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}