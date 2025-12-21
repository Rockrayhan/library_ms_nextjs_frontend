"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logoutUser } from "@/lib/auth";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_API_URL) return;

    async function fetchUser() {
      const data = await getCurrentUser();
      setUser(data);
      setLoading(false);
    }

    fetchUser();
  }, []);

  return (
    <nav className="w-full border-b sticky top-0 z-10 bg-[rgba(26,25,25,0.86)] backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">

        <Link
          href="/"
          className="text-xl font-bold cursor-pointer hover:opacity-80"
        >
          Easy-Library
        </Link>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">

          <Link
            href="/books"
            className="cursor-pointer hover:opacity-80"
          >
            Books
          </Link>

          <Link
            href="/subscription"
            className="cursor-pointer hover:opacity-80"
          >
            Subscription
          </Link>

          {loading ? (
            <span className="text-sm opacity-50">Loading...</span>
          ) : user ? (
            <>
              <Link
                href="/dashboard/user"
                className="cursor-pointer hover:opacity-80"
              >
                My Dashboard
              </Link>

              <small className="cursor-pointer hover:opacity-80">
                {user.name}
              </small>

              <Button
                variant="destructive"
                onClick={async () => {
                  await logoutUser();
                  setUser(null);
                }}
                className="cursor-pointer"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button asChild className="cursor-pointer hover:opacity-80">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
