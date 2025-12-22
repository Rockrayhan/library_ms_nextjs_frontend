"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { getCurrentUser } from "@/lib/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SubscriptionCard({ plan }: any) {
  const [user, setUser] = useState<any>(null);
  const [couponCode, setCouponCode] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const me = await getCurrentUser();
      setUser(me);
    }
    loadUser();
  }, []);

  const userSubscribed =
    user?.subscription?._id && user.subscription._id === plan._id;

  function openModal() {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    setOpen(true);
  }

  async function handleBuy(planId: string) {
    if (!user) return toast.error("Please login first!");

    try {
      const res = await axios.post("/payment/create-checkout-session", {
        planId,
        couponCode,
      });

      window.location.href = res.data.url;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
  }

  return (
    <>
      <Card className="rounded-2xl hover-effect md:w-2/6 w-full">
        <CardHeader>
          <CardTitle className="text-xl capitalize">{plan.planName}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm mb-3 text-gray-300">
            Borrow Limit: {plan.borrowLimit}
          </p>

          <p className="text-lg font-semibold mb-4">
            ৳{plan.price} / month
          </p>

          {userSubscribed ? (
            <Button className="w-full" variant="secondary" disabled>
              Already Subscribed
            </Button>
          ) : (
            <Button className="w-full" onClick={openModal}>
              Buy Plan
            </Button>
          )}
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Puchase {plan.planName}</DialogTitle>
          </DialogHeader>

          <p className="text-gray-400 mb-4">
            Borrow Limit: {plan.borrowLimit}
          </p>

          <p className="text-lg font-semibold mb-3">
            Price: ৳{plan.price}
          </p>

          <input
            type="text"
            placeholder="Enter coupon (optional)"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded border bg-transparent"
          />

          <Button className="w-full" onClick={() => handleBuy(plan._id)}>
            Confirm Purchase
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
