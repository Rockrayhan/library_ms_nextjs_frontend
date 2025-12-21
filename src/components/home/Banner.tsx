import LottieImage from "./LottieImage";

const Banner = () => {
  return (
    <section className=" lg:grid lg:h-screen lg:place-content-center bg-gray-900 mb-12">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
        {/* Text Section */}
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            Your Easy Library,
            <strong className="text-indigo-600"> Simplified </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
            Easy Library helps you borrow books, track reading history, manage
            subscriptions, and explore knowledge — all from one simple and
            modern platform.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="#subscribtion-section"
            >
              Get Started
            </a>

            <a
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative mt-10 h-64 w-full sm:h-80 md:h-full">
          <LottieImage/>
        </div>
      </div>
    </section>
  );
};

export default Banner;
