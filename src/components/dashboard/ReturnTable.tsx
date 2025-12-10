"use client";

import { useState } from "react";
import { returnBorrow } from "@/lib/borrow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default function ReturnTable({ borrows }: any) {
  const [items, setItems] = useState(borrows);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const handleReturn = async (id: string) => {
    if (!confirm("Are you sure you want to return this book?")) return;

    try {
      await returnBorrow(id);
      toast.success("Book returned successfully!");

      setItems((prev: any) =>
        prev.map((b: any) =>
          b._id === id ? { ...b, returned: true } : b
        )
      );
    } catch {
      toast.error("Failed to return book");
    }
  };

  // Search + filter logic
  const filtered = items.filter((b: any) => {
    const matchesSearch = b.user.email
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "returned"
        ? b.returned
        : !b.returned;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Search + Filter */}
      <div className="flex gap-4 mb-5">
        <input
          type="text"
          placeholder="Search by user email..."
          className="border px-3 py-2 rounded w-64"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded "
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option className="bg-gray-500" value="all">All</option>
          <option className="bg-gray-500" value="returned">Returned</option>
          <option className="bg-gray-500" value="pending">Not Returned</option>
        </select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filtered.map((b: any) => (
            <TableRow key={b._id}>
              <TableCell>{b.user.name}</TableCell>
              <TableCell>{b.user.email}</TableCell>
              <TableCell>{b.book.title}</TableCell>
              <TableCell>{b.quantity}</TableCell>
              <TableCell>{b.dueDate?.slice(0, 10) || "-"}</TableCell>
              <TableCell>
                {b.returned ? (
                  <span className="text-green-500 font-medium">Returned</span>
                ) : (
                  <span className="text-red-500 font-medium">Not Returned</span>
                )}
              </TableCell>

              <TableCell>
                {!b.returned ? (
                  <Button size="sm" onClick={() => handleReturn(b._id)}>
                    Return
                  </Button>
                ) : (
                  <Button size="sm" disabled variant="outline">
                    Returned
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
