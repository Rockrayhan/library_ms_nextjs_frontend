"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import BorrowModal from "../borrow/BorrowModal";
import Image from "next/image";

export function BookCard({ book }: any) {
  return (
    <Card className="rounded-2xl hover-effect">
      <CardHeader className="flex flex-col items-center gap-2">
        <div className="w-full h-48 relative rounded-lg overflow-hidden">
          <Image
            src={book.image_url || "/books_demo.png"}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
        <CardTitle className="text-xl mt-2">{book.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm font-semibold">  {book.description}  </p>
        <p className="text-sm text-muted-foreground">Author: {book.author}</p>
        <p className="text-sm">Genre: {book.genre}</p>
        <p className="text-sm">Copies: {book.availableCopies}</p>
      </CardContent>

      <div className="flex gap-2.5 p-4">
        <Link href={`/books/${book._id}`}>
          <Button variant="outline">See Details</Button>
        </Link>

        <BorrowModal book={book} />
      </div>
    </Card>
  );
}
