"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { getAllSubscriptions } from "@/lib/subscriptions";
import SubscriptionsTable from "@/components/dashboard/subscription/SubscriptionsTable";
import CreateSubscriptionModal from "@/components/dashboard/subscription/CreateSubscriptionModal";


export default function ManageSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchSubscriptions = () => {
    setLoading(true);
    getAllSubscriptions()
      .then((data) => setSubscriptions(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Subscriptions</h1>
        <Button onClick={() => setIsCreateOpen(true)}>Create Subscription</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : (
        <SubscriptionsTable subscriptions={subscriptions} refreshSubscriptions={fetchSubscriptions} />
      )}

      {isCreateOpen && (
        <CreateSubscriptionModal
          onClose={() => setIsCreateOpen(false)}
          onCreate={fetchSubscriptions}
        />
      )}
    </div>
  );
}
