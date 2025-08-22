import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div style={{ padding: "20px", textAlign: "center" }}>
        <DotLottieReact
          src="https://lottie.host/da2615bf-dc9c-4b64-891b-906240e6c4eb/oO5m1U9AI8.lottie"
          loop
          autoplay
          style={{ width: "200px", height: "200px", margin: "0 auto" }}
        />
      </div>
    </div>
  );
}

export default Loading;
