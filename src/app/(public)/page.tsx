import Banner from "@/components/home/Banner";
import FaqSection from "@/components/home/FaqSection";
import LatestBooksSection from "@/components/home/LatestBooksSection";
import SubscriptionsSection from "@/components/home/SubscriptionsSection";

export default async function HomePage() {
  return (
    <div className="py-10 text-gray-200">
      <Banner/>

      <LatestBooksSection />

      <SubscriptionsSection />

      <FaqSection />
    </div>
  );
}
