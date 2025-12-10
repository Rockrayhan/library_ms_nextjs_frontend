"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logoutUser } from "@/lib/auth";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on mount
  useEffect(() => {
    async function fetchUser() {
      const data = await getCurrentUser();
      setUser(data);
      setLoading(false);
    }
    fetchUser();
  }, []);

  return (
    <div className="w-full border-b">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="text-xl font-bold">
          Easy-Library
        </Link>

        <div className="flex gap-6 items-center">
          {/* Common Links */}
          <Link href="/books">Books</Link>
          <Link href="/subscription">Subscription</Link>

          {/* Authentication area */}
          {loading ? (
            <span className="text-sm opacity-50">Loading...</span>
          ) : user ? (
            // When logged in
            <>
              <Link href="/dashboard/user">My Dashboard</Link>

              <Button
                variant="destructive"
                onClick={async () => {
                  await logoutUser();
                  setUser(null); // instantly update navbar
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            // When not logged in
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
