"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createSubscription } from "@/lib/subscriptions";

export default function CreateSubscriptionModal({ onClose, onCreate }: any) {
  const [planName, setPlanName] = useState("basic");
  const [price, setPrice] = useState(0);
  const [borrowLimit, setBorrowLimit] = useState(1);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createSubscription({ planName, price, borrowLimit });

      toast.success("Subscription created!");
      onClose();
      onCreate?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-96 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Create Subscription</h2>

        <label className="block mb-2 text-gray-300">Plan Name</label>
        <select
          className="p-2 rounded border border-gray-700 bg-gray-800 text-white w-full"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        >
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="standard">Standard</option>
        </select>

        <label className="block mt-3 mb-2 text-gray-300">Price</label>
        <Input
          type="number"
          min={0}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label className="block mt-3 mb-2 text-gray-300">Borrow Limit</label>
        <Input
          type="number"
          min={1}
          value={borrowLimit}
          onChange={(e) => setBorrowLimit(Number(e.target.value))}
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
