import Image from "next/image";
import BannerItem from "./BannerItem";

const Banner = () => {
  return (
    <section className="bg-gray-900 mb-12">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:grid md:grid-cols-2 md:items-center md:gap-8 lg:px-8 lg:py-28">
        
        {/* Text Section */}
        <div className="max-w-prose text-center md:text-left mx-auto md:mx-0">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">
            Your Easy Library,
            <span className="block text-indigo-500">
              Simplified
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            Easy Library helps you borrow books, track reading history, manage
            subscriptions, and explore knowledge — all from one simple and
            modern platform.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
            <a
              href="#subscribtion-section"
              className="w-full sm:w-auto text-center rounded bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Get Started
            </a>

            <a
              href="#"
              className="w-full sm:w-auto text-center rounded border border-gray-600 px-6 py-3 font-medium text-gray-200 transition hover:bg-gray-800"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Banner Image */}
        {/* <div className="relative mt-10 w-full h-64  md:h-[400px]">
          <Image
            src="/library-banner.jpg"
            alt="Library Banner"
            fill
            className="rounded-2xl object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div> */}
        <BannerItem/>
      </div>
    </section>
  );
};

export default Banner;