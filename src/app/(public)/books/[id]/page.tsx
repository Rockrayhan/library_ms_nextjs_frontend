import { Button } from "@/components/ui/button";
import Link from "next/link";

// 🔹 Fetch book directly inside this file
export async function fetchBookById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json.data;
}

export default async function BookDetailsPage({ params }: any) {
  const { id } = await params; // ⬅️ FIX HERE

  const book = await fetchBookById(id);

  if (!book) {
    return (
      <div className="text-center text-xl text-red-400 py-20">
        Book not found!
      </div>
    );
  }
  return (
    <div className="container mx-auto py-10 text-gray-200">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-700 p-8 rounded-2xl shadow-lg">
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>

        {/* Meta */}
        <p className="text-gray-400">Author: {book.author}</p>
        <p className="text-gray-400">Genre: {book.genre}</p>
        <p className="text-gray-400">
          Copies Available: {book.availableCopies}
        </p>

        {/* Description */}
        <p className="mt-6 text-lg">{book.description}</p>

        {/* Actions */}
        <div className="mt-10 flex gap-4">
          <Link href="/books">
            <Button variant="outline">Back to Books</Button>
          </Link>

          {book.available ? (
            <Link href={`/borrow/${book._id}`}>
              <Button>Borrow Book</Button>
            </Link>
          ) : (
            <Button disabled>Not Available</Button>
          )}
        </div>
      </div>
    </div>
  );
}
