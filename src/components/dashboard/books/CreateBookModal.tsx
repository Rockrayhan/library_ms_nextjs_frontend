"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createBook } from "@/lib/books";

export default function CreateBookModal({ onClose, onCreate }: any) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("FICTION");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(1);
  const [availableCopies, setAvailableCopies] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createBook({ title, author, genre, description, in_stock: inStock, availableCopies, image_url: imageUrl });
      toast.success("Book created successfully!");
      onClose();
      onCreate?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-3/6  border border-gray-700 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Create Book</h2>

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
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
