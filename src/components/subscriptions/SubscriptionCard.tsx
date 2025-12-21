"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { getCurrentUser } from "@/lib/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SkeletonLoader from "../shared/SkeletonLoader";

export function SubscriptionCard({ plan }: any) {
  const [user, setUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    async function loadUser() {
      const me = await getCurrentUser();
      setUser(me);
      // setLoading(false);
    }
    loadUser();
  }, []);

  // If still loading user data, show skeleton / placeholder
  // if (loading) {
  //   return (
  //     <SkeletonLoader/>
  //   );
  // }

  // Check if the user is already subscribed to this plan
  const userSubscribed =
    user?.subscription?._id && user.subscription._id === plan._id;

  async function handleBuy(planId: string) {
    if (!user) {
      toast.error("Please login first to buy a subscription!");
      return;
    }

    // Block purchasing the same plan
    if (userSubscribed) {
      toast.error("You already own this subscription plan!");
      return;
    }

    // Proceed to checkout
    try {
      const res = await axios.post("/payment/create-checkout-session", {
        planId,
      });

      window.location.href = res.data.url;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
  }

  return (
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
          <Button className="w-full" onClick={() => handleBuy(plan._id)}>
            Buy Plan
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
