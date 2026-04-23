"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const BannerItem = () => {
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLottie(true), 500); // delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full mb-10 h-64 sm:h-80 md:h-[400px]">
      {!showLottie ? (
        <Image
          src="/library-banner2.png"
          alt="banner"
          width={1500}
          height={1500}
          className="rounded-2xl"
          priority
        />
      ) : (
        <div className=" mb-8 md:-mt-16 w-96 md:w-auto">
            <Lottie animationData={require("../../../public/banner_lotty.json")} />
        </div>
      )}
    </div>
  );
};

export default BannerItem;