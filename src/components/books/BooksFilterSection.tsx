"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { BookCard } from "./BookCard";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const GENRES = ["ALL", "FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "ISLAMIC"];

export default function BooksFilterSection({ books }: { books: any[] }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("ALL");

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const matchesGenre = genre === "ALL" || book.genre === genre;

      return matchesSearch && matchesGenre;
    });
  }, [search, genre, books]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <Input
          placeholder="Search by title or author..."
          className="w-full md:w-2/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Genre Filter */}
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="w-full md:w-1/3">
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>

          <SelectContent>
            {GENRES.map((g) => (
              <SelectItem key={g} value={g}>
                {g === "ALL" ? "All Genres" : g.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No books found matching your filters.
          </p>
        )}
      </div>
    </>
  );
}
