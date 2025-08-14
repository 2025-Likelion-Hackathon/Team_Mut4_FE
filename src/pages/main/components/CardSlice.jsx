import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const CardSlice = ({ cards }) => {
  const [progress, setProgress] = useState(0);

  return (
    <div className="w-[full] pl-[9px]">
      <Swiper
        modules={[FreeMode]}
        spaceBetween={-145}
        slidesPerView="auto"
        freeMode={true}
        onProgress={(_, progress) => {
          setProgress(progress);
        }}
        className="w-full h-[190px] "
      >
        {cards.map((Card, index) => (
          <SwiperSlide key={index} className="w-[255px]">
            <Card />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 카드 ui 바 */}
      <div className="w-1/2 px-[9px] mt-4 mx-auto">
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSlice;
