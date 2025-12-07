"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <div className="w-full border-b">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="text-xl font-bold">LibraryMS</Link>

        <div className="flex gap-6">
          <Link href="/books">Books</Link>
          <Link href="/subscription">Subscription</Link>

          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
