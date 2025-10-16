import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const ReviewsSection = ({ destinationId }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    userName: "",
  });

  // Fetch reviews for this destination
  useEffect(() => {
    if (!destinationId) return; // prevent running without ID

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/reviews/destination/${destinationId}`
        );
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // fallback mock data
        setReviews([
          {
            id: 1,
            userName: "Traveler123",
            rating: 5,
            comment: "Amazing destination! Loved every moment.",
            timestamp: "2024-01-15T10:30:00",
          },
          {
            id: 2,
            userName: "AdventureSeeker",
            rating: 4,
            comment: "Great place, but a bit crowded during peak season.",
            timestamp: "2024-01-10T14:22:00",
          },
        ]);
      }
    };

    fetchReviews();
  }, [destinationId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const reviewToSubmit = {
        ...newReview,
        destinationId: destinationId,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewToSubmit),
      });

      if (response.ok) {
        const savedReview = await response.json();
        setReviews([...reviews, savedReview]);
        setNewReview({ rating: 0, comment: "", userName: "" });
        setShowReviewForm(false);
        alert("Review submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      const mockReview = {
        id: Date.now(),
        ...newReview,
        destinationId,
        timestamp: new Date().toISOString(),
      };
      setReviews([...reviews, mockReview]);
      setNewReview({ rating: 0, comment: "", userName: "" });
      setShowReviewForm(false);
      alert("Review added locally (demo).");
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        color={index < rating ? "#ffc107" : "#e4e5e9"}
        size={14}
      />
    ));

  return (
    <div className="reviews-section">
      <h3>Reviews ({reviews.length})</h3>

      {!showReviewForm ? (
        <button
          onClick={() => setShowReviewForm(true)}
          className="add-review-btn"
        >
          + Add Review
        </button>
      ) : (
        <form onSubmit={handleSubmitReview} className="review-form">
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={newReview.userName}
              onChange={(e) =>
                setNewReview({ ...newReview, userName: e.target.value })
              }
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  color={star <= newReview.rating ? "#ffc107" : "#e4e5e9"}
                  onClick={() =>
                    setNewReview({ ...newReview, rating: star })
                  }
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
              ))}
              <span style={{ marginLeft: "10px" }}>
                {newReview.rating}/5
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              required
              placeholder="Share your experience..."
              rows="3"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <strong>{review.userName}</strong>
                <div className="review-stars">
                  {renderStars(review.rating)}
                  <span className="rating-number">({review.rating})</span>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <small className="review-date">
                {new Date(review.timestamp).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;