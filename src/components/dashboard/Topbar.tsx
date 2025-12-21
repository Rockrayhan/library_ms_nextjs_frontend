"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";

export default function Topbar({ user }: any) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <div className="w-full bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
      <div className="text-gray-200">
        Welcome, <span className="font-semibold">{user?.name || "Guest"}</span>
      </div>

      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
         Dashboard Logout
        </button>
      )}
    </div>
  );
}
