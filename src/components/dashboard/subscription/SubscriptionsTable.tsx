"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteSubscription } from "@/lib/subscriptions";
import { toast } from "sonner";
import EditSubscriptionModal from "./EditSubscriptionModal";

export default function SubscriptionsTable({
  subscriptions,
  refreshSubscriptions,
}: any) {
  const [editingSubscription, setEditingSubscription] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscription?")) return;
    try {
      await deleteSubscription(id);
      toast.success("Subscription deleted!");
      refreshSubscriptions?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Borrow Limit</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {subscriptions.map((sub: any) => (
            <TableRow key={sub._id}>
              <TableCell>{sub.planName}</TableCell> 
              <TableCell>{sub.price}</TableCell>
              <TableCell>{sub.borrowLimit}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => setEditingSubscription(sub)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="ml-2"
                  onClick={() => handleDelete(sub._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingSubscription && (
        <EditSubscriptionModal
          subscription={editingSubscription}
          onClose={() => setEditingSubscription(null)}
          onUpdate={refreshSubscriptions}
        />
      )}
    </div>
  );
}
