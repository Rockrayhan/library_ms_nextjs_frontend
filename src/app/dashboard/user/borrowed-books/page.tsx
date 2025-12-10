"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getUserBorrowHistory } from "@/lib/borrow";
import SkeletonLoader from "@/components/shared/SkeletonLoader";

export default function BorrowedBooksPage() {
  const [user, setUser] = useState<any>(null);
  const [borrows, setBorrows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const u = await getCurrentUser();
      setUser(u);

      if (u) {
        const data = await getUserBorrowHistory(u._id);
        setBorrows(data);
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading)
    return (
      <SkeletonLoader/>
    );

  return (
    <div className="text-gray-200">
      <h1 className="text-2xl font-bold mb-6">My Borrow History</h1>

      {borrows.length === 0 ? (
        <div className="p-4 bg-gray-800 rounded border border-gray-700">
          You have no borrow history.
        </div>
      ) : (
        <div className="space-y-4">
          {borrows.map((item) => (
            <div
              key={item._id}
              className="p-4 bg-gray-800 rounded-md border border-gray-700"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.book?.title || "Unknown Book"}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Due: {new Date(item.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center">
                  {item.returned ? (
                    <span className="px-3 py-1 rounded bg-green-600 text-white text-sm">
                      Returned
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded bg-yellow-600 text-white text-sm">
                      Not Returned
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
