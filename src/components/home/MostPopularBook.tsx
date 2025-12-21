import { fetchAllBooks } from "@/lib/server-api";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const MostPopularBook = async () => {
  const books = await fetchAllBooks();

  if (!books || books.length === 0) return null;

  // determine "most popular"
  const mostPopular = books.reduce((prev: any, current: any) =>
    prev.availableCopies < current.availableCopies ? prev : current
  );

  return (
    <section className="py-24 bg-gray-900">
      <div className="container">
        <h2 className="text-center text-3xl font-semibold mb-12">
          Most Popular Right Now
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Book Image */}
          <div className="w-full flex justify-center">
            <Image
              src={mostPopular.image_url || "/books_demo.png"}
              alt={mostPopular.title}
              width={400}
              height={500}
              className="rounded-xl object-cover shadow-lg hover:opacity-90 transition"
            />
          </div>

          {/* Book Content */}
          <div className="space-y-4">
            <h3 className="text-4xl font-bold">{mostPopular.title}</h3>

            <p className="text-lg text-gray-400">
              Author: {mostPopular.author}
            </p>

            <p className="text-gray-300 leading-relaxed">
              {mostPopular.description}
            </p>

            <div className="pt-4">
              <Link href={`/books/${mostPopular._id}`}>
                <Button size="lg">See Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostPopularBook;
