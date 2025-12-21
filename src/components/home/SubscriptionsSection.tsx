import { fetchSubscriptions } from "@/lib/server-api";
import { SubscriptionCard } from "../subscriptions/SubscriptionCard";


const SubscriptionsSection = async () => {
  const subscriptions = await fetchSubscriptions();

  return (
    <div className="py-16" id="subscribtion-section">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Subscription Plans
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {subscriptions?.map((sub: any) => (
          <SubscriptionCard key={sub._id} plan={sub} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsSection;
