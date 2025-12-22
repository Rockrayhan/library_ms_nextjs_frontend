import axios from "./axios";

export async function fetchReviewsByBook(bookId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${bookId}`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json.data;
}

export async function addReview(payload: any) {
  return await axios.post("/reviews", payload);
}

export async function updateReview(reviewId: string, payload: any) {
  return await axios.patch(`/reviews/${reviewId}`, payload);
}
