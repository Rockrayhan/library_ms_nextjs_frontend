"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import BorrowModal from "../borrow/BorrowModal";


export function BookCard({ book }: any) {
  return (
    <Card className="hover:shadow-xl transition rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">{book.title}</CardTitle>
      </CardHeader>

      <CardContent>
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
