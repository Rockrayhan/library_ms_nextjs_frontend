"use client";

import { useEffect, useState } from "react";
import { getAllBorrows, returnBorrow } from "@/lib/borrow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ManageBorrowPage() {
  const [borrows, setBorrows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllBorrows();
      setBorrows(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (id: string) => {
    const confirmed = confirm("Are you sure this book is returned?");
    if (!confirmed) return;

    try {
      setProcessingId(id);
      await returnBorrow(id);
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setProcessingId("");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="p-10">Loading borrow records...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Borrowed Books</h1>

      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 border border-gray-700">User</th>
            <th className="p-3 border border-gray-700">Book</th>
            <th className="p-3 border border-gray-700">Quantity</th>
            <th className="p-3 border border-gray-700">Due Date</th>
            <th className="p-3 border border-gray-700">Returned</th>
            <th className="p-3 border border-gray-700">Action</th>
          </tr>
        </thead>

        <tbody>
          {borrows.map((b) => (
            <tr key={b._id} className="border border-gray-700">
              <td className="p-3 border border-gray-700">
                {b?.user?.name || "Unknown"}
              </td>

              <td className="p-3 border border-gray-700">
                {b?.book?.title}
              </td>

              <td className="p-3 border border-gray-700">{b.quantity}</td>

              <td className="p-3 border border-gray-700">
                {b.dueDate?.slice(0, 10)}
              </td>

              <td className="p-3 border border-gray-700">
                {b.returned ? (
                  <span className="text-green-400 font-semibold">Returned</span>
                ) : (
                  <span className="text-red-400 font-semibold">Not Returned</span>
                )}
              </td>

              <td className="p-3 border border-gray-700">
                {b.returned ? (
                  <span className="text-gray-500">--- </span>
                ) : (
                  <Button
                    disabled={processingId === b._id}
                    onClick={() => handleReturn(b._id)}
                  >
                    {processingId === b._id ? "Processing..." : "Return"}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
