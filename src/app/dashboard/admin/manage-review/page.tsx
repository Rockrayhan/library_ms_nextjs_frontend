"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axios from "@/lib/axios";

const AllReviewManagePage = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/reviews");
      setReviews(res.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleStatus = async (id: string, isActive: boolean) => {
    try {
      await axios.patch(`/reviews/status/${id}`, { isActive: !isActive });
      toast.success("Review status updated");
      fetchReviews();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`/reviews/${id}`);
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">Manage Reviews</h1>

      {loading ? (
        <p className="text-gray-400">Loading reviews...</p>
      ) : (
        <Table className="bg-gray-900 border border-gray-800 rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>{review.bookId?.title || "Unknown"}</TableCell>
                <TableCell>{review.userId?.name || "Unknown"}</TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  <Badge className={review.isActive ? "bg-green-700 text-white" : "bg-red-700 text-white"}>
                    {review.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStatus(review._id, review.isActive)}
                  >
                    Change Status
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteReview(review._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AllReviewManagePage;
