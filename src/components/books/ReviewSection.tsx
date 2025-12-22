// ---------------- ReviewSection.tsx ----------------
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import ReviewForm from "./ReviewForm";

interface Props {
  bookId: string;
}

const ReviewSection: React.FC<Props> = ({ bookId }) => {
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${bookId}`
      );
      const json = await res.json();
      setReviews(json.data || []);
    } catch (err) {
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  return (
    <section className="max-w-4xl text-gray-200 space-y-8">
      <h2 className="text-2xl font-semibold">Reviews</h2>

      <div className="mt-10 space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card
              key={review._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4"
            >
              <p className="font-semibold text-indigo-300">
                ⭐ {review.rating}/5
              </p>
              <p className="text-gray-300 mt-2">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-2">
                User: {review.userId?.name || "Unknown"}
              </p>
            </Card>
          ))
        ) : (
          <p className="text-gray-400">No reviews yet.</p>
        )}
      </div>

      <ReviewForm
        bookId={bookId}
        reviews={reviews}
        onReviewUpdated={fetchReviews}
      />
    </section>
  );
};

export default ReviewSection;
