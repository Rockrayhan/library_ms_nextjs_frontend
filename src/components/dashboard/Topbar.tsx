"use client";


import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";

export default function Topbar({ user }: any) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <div className="w-full bg-white p-4 shadow flex justify-between items-center">
      <div>Welcome, {user?.name || "Guest"}</div>
      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}
    </div>
  );
}
