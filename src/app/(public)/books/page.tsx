import { BookCard } from "@/components/books/BookCard";
import { getAllBooks } from "@/lib/books";


export default async function AllBooksPage() {
  const books = await getAllBooks();
  console.log(books);
  

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-semibold">All Books</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book: any) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
