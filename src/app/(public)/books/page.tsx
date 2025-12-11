import BooksFilterSection from "@/components/books/BooksFilterSection";
import { getAllBooks } from "@/lib/books";


export default async function AllBooksPage() {
  const books = await getAllBooks();

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-semibold">All Books</h1>

      {/* Client Side Filter Section */}
      <BooksFilterSection books={books} />
    </div>
  );
}
