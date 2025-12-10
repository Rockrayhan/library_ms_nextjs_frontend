"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function UsersTable({ users }: any) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u: any) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">

      <Input
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="border rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Borrowed Books</TableHead>
              <TableHead>Borrow limit</TableHead>
              {/* <TableHead>Block user</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}

            {filtered.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>

                <TableCell>
                  {user.subscription
                    ? user.subscription.planName
                    : "No Plan"}
                </TableCell>


                <TableCell>{user.borrowedBooks}</TableCell>
                <TableCell>{user?.subscription?.borrowLimit}</TableCell>
                {/* <TableCell> <Button className=""> unblocked </Button> </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
