import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export async function fetchBookById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json.data;
}

export async function fetchSuggestedBooks(genre: string, currentId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    cache: "no-store",
  });

  const json = await res.json();

  return json.data
    .filter((b: any) => b.genre === genre && b._id !== currentId)
    .slice(0, 4);
}

export default async function BookDetailsPage({ params }: any) {
  const { id } = await params;

  const book = await fetchBookById(id);

  if (!book) {
    return (
      <div className="text-center text-xl text-red-400 py-20">
        Book not found!
      </div>
    );
  }

  const suggested = await fetchSuggestedBooks(book.genre, book._id);

  return (
    <div className="container mx-auto py-16">
      <Card className="bg-gray-900 border-gray-800 rounded-2xl shadow-2xl p-6 md:p-10">
        <CardContent className="flex flex-col md:flex-row gap-10">
          {/* Book Cover */}
          <div className="relative w-full md:w-1/3 h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={book.image_url || "/books_demo.png"}
              alt={book.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-gray-200">
            <h1 className="text-4xl font-bold mb-3">{book.title}</h1>

            <div className="flex flex-wrap gap-3 mt-4">
              <Badge variant="outline">Author: {book.author}</Badge>
              <Badge variant="outline">{book.genre}</Badge>
              <Badge
                variant="outline"
                className={`${
                  book.availableCopies ? "text-green-400" : "text-red-400"
                }`}
              >
                Copies: {book.availableCopies}
              </Badge>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              {book.description}
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Link href="/books">
                <Button variant="outline" className="rounded-lg">
                  Back to Books
                </Button>
              </Link>

              {book.available ? (
                <Link href={`/borrow/${book._id}`}>
                  <Button className="rounded-lg">Borrow Book</Button>
                </Link>
              ) : (
                <Button disabled className="rounded-lg opacity-60">
                  Not Available
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {suggested.length > 0 && (
        <div className="container mx-auto mt-20">
          <h2 className="text-2xl font-semibold text-gray-200 mb-6">
            Suggested for you
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {suggested.map((item: any) => (
              <Link key={item._id} href={`/books/${item._id}`}>
                <div className="group cursor-pointer bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg transition hover:-translate-y-1 hover:shadow-indigo-500/40">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image_url || "/books_demo.png"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-4 text-gray-200">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-indigo-400 transition">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">{item.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
