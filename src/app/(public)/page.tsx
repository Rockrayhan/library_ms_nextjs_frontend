import { BookCard } from "@/components/books/BookCard";
import { fetchAllBooks, fetchSubscriptions } from "@/lib/server-api";
import Link from "next/link";

export default async function HomePage() {
  const books = await fetchAllBooks();
  const subscriptions = await fetchSubscriptions();


  return (
    <div className="py-10 container mx-auto text-gray-200">
      <h1 className="text-4xl font-bold">Welcome to Easy Library</h1>
      <p className="mt-4 text-gray-400">
        Explore books & manage your subscription easily.
      </p>

      {/* Latest Books */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Latest Books</h2>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {books?.slice(0, 6).map((book: any) => (
                 <BookCard key={book._id} book={book} />
               ))}
             </div>
      </div>

      {/* Subscription Plans */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold mb-4">Subscription Plans</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subscriptions?.map((sub: any) => (
            <div
              key={sub._id}
              className="border border-gray-700 bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2">{sub.name}</h3>

              <p className="text-gray-400 text-sm">{sub.description}</p>

              <div className="mt-3 text-lg font-semibold">
                ৳{sub.price} / month
              </div>

              <Link
                href={`/subscription/${sub._id}`}
                className="mt-4 text-blue-400 inline-block"
              >
                View Plan →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
