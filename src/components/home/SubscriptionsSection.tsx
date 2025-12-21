import { fetchSubscriptions } from "@/lib/server-api";
import { SubscriptionCard } from "../subscriptions/SubscriptionCard";


const SubscriptionsSection = async () => {
  const subscriptions = await fetchSubscriptions();

  return (
    <div className="py-24 container" id="subscribtion-section">
      <h2 className="text-3xl font-semibold mb-12 text-center">
        Subscription Plans
      </h2>

      <div className="center gap-5 flex-wrap">
        {subscriptions?.map((sub: any) => (
          <SubscriptionCard key={sub._id} plan={sub} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsSection;
