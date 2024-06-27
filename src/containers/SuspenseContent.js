import React from "react";
import Lottie from "react-lottie";
import animationData from "../pages/Loading.json"; // Update with your JSON path

function SuspenseContent() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-300 dark:text-gray-200 bg-base-100">
      <Lottie options={defaultOptions} height={70} width={70} />
      {/* <p style={{ marginLeft: "20px" }}>Loading...</p> */}
    </div>
  );
}

export default SuspenseContent;
