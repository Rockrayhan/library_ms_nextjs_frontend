import Banner from "@/components/home/Banner";
import FaqSection from "@/components/home/FaqSection";
import LatestBooksSection from "@/components/home/LatestBooksSection";
import MostPopularBook from "@/components/home/MostPopularBook";
import OurClients from "@/components/home/OurClients";
import SubscriptionsSection from "@/components/home/SubscriptionsSection";

export default async function HomePage() {
  return (
    <div className="pb-10 text-gray-200">
      <Banner />

      <LatestBooksSection />

      <MostPopularBook/>

      <SubscriptionsSection />

      <OurClients />

      <FaqSection />
    </div>
  );
}
