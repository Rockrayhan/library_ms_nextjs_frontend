"use client";

import { useState } from "react";
import { borrowBook } from "@/lib/borrow";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BorrowModal({ book }: any) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async () => {
    const user = await getCurrentUser();
    if (!user) return toast.error("Please login first");

    const result = await borrowBook({
      user: user._id,
      book: book._id,
      quantity,
      dueDate,
    });

    if (!result) return; 

    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Borrow</Button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">
              Borrow "{book.title}"
            </h2>

            <label className="block mb-3 text-gray-300">
              Quantity:
              <input
                type="number"
                min={1}
                max={book.availableCopies}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              />
            </label>

            <label className="block mb-3 text-gray-300">
              Due Date:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              />
            </label>

            <div className="flex justify-end gap-3 mt-5">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Confirm Borrow</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
