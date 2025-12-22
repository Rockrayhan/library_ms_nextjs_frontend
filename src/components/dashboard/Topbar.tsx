"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Topbar({ user }: any) {
  const router = useRouter();

  // const handleLogout = async () => {
  //   await logoutUser();
  //   router.push("/");
  // };

  return (
    <div className="w-full bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
      <div className="text-gray-200">
        Welcome, <span className="font-semibold">{user?.name || "Guest"}</span>
      </div>

      <div className="center gap-2.5">
        <Link href="/">
       
          <Button>
      
            <HomeIcon /> Go to Home
          </Button>
        </Link>

        {/* {user && (
          <Button
            onClick={handleLogout}
            variant="destructive"
            className=" hover:bg-red-700 transition"
          >
            Dashboard Logout
          </Button>
        )} */}
      </div>
    </div>
  );
}
