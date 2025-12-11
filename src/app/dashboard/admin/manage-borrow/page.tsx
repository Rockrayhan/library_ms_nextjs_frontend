"use client";

import { useEffect, useState } from "react";
import ReturnTable from "@/components/dashboard/ReturnTable";
import { getAllBorrows } from "@/lib/borrow";
import SkeletonLoader from "@/components/shared/SkeletonLoader";

export default function ManageBorrowPage() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getAllBorrows()
      .then((data) => setBorrows(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Return Management</h1>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <ReturnTable borrows={borrows} />
      )}
    </div>
  );
}
