"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBook } from "@/lib/books";

export default function CreateBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("FICTION");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(1);
  const [availableCopies, setavailableCopies] = useState(1);

  const handleSubmit = async () => {
    try {
      await createBook({ title, author, genre, description, in_stock: inStock, availableCopies: availableCopies });
      toast.success("Book created successfully!");
      router.push("/dashboard/admin/manage-books");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create book");
    }
  };

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create Book</h1>

      <div className="flex flex-col gap-4">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        
        <select
          className="p-2 rounded border border-gray-700 bg-gray-800 text-white"
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

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          type="number"
          min={1}
          placeholder="Stock"
          value={inStock}
          onChange={(e) => setInStock(Number(e.target.value))}
        />

        <Input
          type="number"
          min={1}
          placeholder="availableCopies"
          value={availableCopies}
          onChange={(e) => setavailableCopies(Number(e.target.value))}
        />

        <Button onClick={handleSubmit}>Create Book</Button>
      </div>
    </div>
  );
}
