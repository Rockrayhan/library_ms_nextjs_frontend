"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteBook } from "@/lib/books";
import { useState } from "react";
import EditBookModal from "./EditBookModal";

export default function BooksTable({ books, refreshBooks }: any) {
  const [editingBook, setEditingBook] = useState<any>(null);

  const handleDelete = async (bookId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      await deleteBook(bookId, {});
      toast.success("Book deleted successfully!");
      refreshBooks?.(); // refresh table after delete
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete book");
    }
  };

  return (
    <>
      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onUpdate={refreshBooks} // refresh table after edit
        />
      )}

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Available Copies</TableHead>
              <TableHead>Total Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {books.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No books found.
                </TableCell>
              </TableRow>
            )}

            {books.map((book: any) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.availableCopies}</TableCell>
                <TableCell>{book.in_stock}</TableCell>
                <TableCell className="flex gap-2">
                  <Button onClick={() => setEditingBook(book)}>Edit</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
