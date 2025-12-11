"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateBook } from "@/lib/books";

export default function EditBookModal({ book, onClose, onUpdate }: any) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [description, setDescription] = useState(book.description);
  const [inStock, setInStock] = useState(book.in_stock);
  const [availableCopies, setAvailableCopies] = useState(book.availableCopies);
  const [imageUrl, setImageUrl] = useState(book.image_url || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateBook(book._id, { title, author, genre, description, in_stock: inStock, availableCopies, image_url: imageUrl });
      toast.success("Book updated successfully!");
      onClose();
      onUpdate?.(); // refresh table if callback provided
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-gray-900 p-6 rounded-xl w-3/6 border border-gray-700 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Edit "{book.title}"</h2>

        <label className="block mb-1 text-gray-300">Title</label>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="block mt-3 mb-1 text-gray-300">Author</label>
        <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />

        <label className="block mt-3 mb-1 text-gray-300">Genre</label>
        <select
          className="p-2 rounded border border-gray-700 bg-gray-800 text-white w-full"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="FICTION">FICTION</option>
          <option value="NON_FICTION">NON_FICTION</option>
          <option value="SCIENCE">SCIENCE</option>
          <option value="HISTORY">HISTORY</option>
          <option value="BIOGRAPHY">BIOGRAPHY</option>
          <option value="ISLAMIC">ISLAMIC</option>
        </select>

        <label className="block mt-3 mb-1 text-gray-300">Description</label>
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mt-3 mb-1 text-gray-300">Total Stock</label>
        <Input
          type="number"
          min={1}
          value={inStock}
          onChange={(e) => setInStock(Number(e.target.value))}
        />

        <label className="block mt-3 mb-1 text-gray-300">Available Copies</label>
        <Input
          type="number"
          min={1}
          value={availableCopies}
          onChange={(e) => setAvailableCopies(Number(e.target.value))}
        />

        <label className="block mt-3 mb-1 text-gray-300">Image URL</label>
        <Input
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
