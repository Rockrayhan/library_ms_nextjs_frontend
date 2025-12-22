"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getCurrentUser } from "@/lib/auth";
import { toast } from "sonner";

interface Props {
  bookId: string;
  reviews: any[]; // pass all reviews to check if user already reviewed
  onReviewUpdated?: () => void; // callback to refresh reviews
}

const ReviewForm: React.FC<Props> = ({ bookId, reviews, onReviewUpdated }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [existingReview, setExistingReview] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const me = await getCurrentUser();
      setUser(me);
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      const review = reviews.find(r => r.userId._id === user._id);
      if (review) {
        setExistingReview(review);
        setRating(review.rating);
        setComment(review.comment);
      }
    }
  }, [user, reviews]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login first to submit a review!");
      return;
    }

    if (!comment || rating < 1 || rating > 5) {
      toast.error("Please provide a valid rating and comment!");
      return;
    }

    setLoading(true);

    try {
      const url = existingReview
        ? `${process.env.NEXT_PUBLIC_API_URL}/reviews/${existingReview._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

      const method = existingReview ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bookId,
          rating,
          comment,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit review");
      }

      toast.success(existingReview ? "Review updated!" : "Review submitted!");
      onReviewUpdated?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingReview) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${existingReview._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to delete review");
      toast.success("Review deleted!");
      setExistingReview(null);
      setRating(5);
      setComment("");
      onReviewUpdated?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  // If user already reviewed, show edit/delete options
  return (
    <form
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4"
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h3 className="text-xl font-semibold text-gray-200">
        {existingReview ? "Edit Your Review" : "Write a Review"}
      </h3>
      <small className="text-gray-400">Provide Your Rating (1-5)</small>

      <Input
        type="number"
        min={1}
        max={5}
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
        className="bg-black text-white"
      />

      <Textarea
        placeholder="Your review..."
        className="bg-black text-white"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : existingReview ? "Update Review" : "Submit Review"}
        </Button>

        {existingReview && (
          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
