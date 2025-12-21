"use client";

import { useEffect, useState } from "react";
import { getAllSubscriptions } from "@/lib/subscriptions";
import { toast } from "sonner";
import { SubscriptionCard } from "@/components/subscriptions/SubscriptionCard";

export default function SubscriptionPage() {
  const [plans, setPlans] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSubscriptions()
      .then(setPlans)
      .catch(() => toast.error("Failed to load subscriptions"))
      // .finally(() => setLoading(false));
  }, []);

  const handleSelectPlan = (plan: any) => {
    toast.success(`Selected plan: ${plan.planName}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Subscription Plans</h1>

      {/* {loading && <p>Loading...</p>} */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan: any) => (
          <SubscriptionCard
            key={plan._id}
            plan={plan}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>
    </div>
  );
}
