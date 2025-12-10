"use client";

import { useEffect, useState } from "react";
import { getAllBooks } from "@/lib/books";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import BooksTable from "@/components/dashboard/BooksTable";
import CreateBookModal from "@/components/dashboard/CreateBookModal";


export default function ManageBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchBooks = () => {
    setLoading(true);
    getAllBooks()
      .then((data) => setBooks(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Books</h1>
        <Button onClick={() => setIsCreateOpen(true)}>Create Book</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : (
        <BooksTable books={books} refreshBooks={fetchBooks} />
      )}

      {isCreateOpen && (
        <CreateBookModal
          onClose={() => setIsCreateOpen(false)}
          onCreate={fetchBooks} // refresh table after creation
        />
      )}
    </div>
  );
}
