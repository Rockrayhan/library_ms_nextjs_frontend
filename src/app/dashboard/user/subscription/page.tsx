"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

export default function UserSubscriptionPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );

  if (!user)
    return <div className="p-10 text-center text-red-500">Failed to load user info</div>;

  const subscription = user.subscription || { planName: "No Plan", borrowLimit: 0 };
  const availableBorrows = subscription.borrowLimit - user.borrowedBooks;

  return (
    <div className="p-10 max-w-md mx-auto">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Current Plan:</strong> {subscription.planName}</p>
          <p><strong>Borrow Limit:</strong> {subscription.borrowLimit}</p>
          <p><strong>Borrowed Books:</strong> {user.borrowedBooks}</p>
          <p><strong>Available Borrows:</strong> {availableBorrows > 0 ? availableBorrows : 0}</p>
        </CardContent>
      </Card>
    </div>
  );
}
