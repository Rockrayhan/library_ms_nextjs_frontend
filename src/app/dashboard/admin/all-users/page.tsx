"use client";

import { useEffect, useState } from "react";
import UsersTable from "@/components/dashboard/UsersTable";
import { getAllUsers } from "@/lib/borrow";
import SkeletonLoader from "@/components/shared/SkeletonLoader";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)); // stop loader
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      {loading ? (
        <SkeletonLoader/>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
}
