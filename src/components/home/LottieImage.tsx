"use client"

import banner_lotty from "../../../public/banner_lotty.json";
import Lottie from "lottie-react";



const LottieImage = () => {
    return (
        <div>
            <Lottie animationData={banner_lotty} />
        </div>
    );
};

export default LottieImage;