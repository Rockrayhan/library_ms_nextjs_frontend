import Banner from "@/components/home/Banner";
import FaqSection from "@/components/home/FaqSection";
import LatestBooksSection from "@/components/home/LatestBooksSection";
import SubscriptionsSection from "@/components/home/SubscriptionsSection";

export default async function HomePage() {
  return (
    <div className="pb-10 text-gray-200">
      <Banner />

      <div className="container">
        <LatestBooksSection />

        <SubscriptionsSection />

        <FaqSection />
      </div>
    </div>
  );
}
