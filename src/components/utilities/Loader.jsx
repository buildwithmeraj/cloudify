import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[78vh]">
      <DotLottieReact
        src="https://lottie.host/9208e9e4-be09-4d9e-a8ed-d6298f6eecf4/5qATPuvWhy.lottie"
        loop
        className="w-100"
        autoplay
      />
    </div>
  );
};

export default Loader;
