import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

//  카드 슬라이스 컴포넌트
const CardSlice = ({ cards, type = "chat" }) => {
  const [progress, setProgress] = useState(0);

  const getSpaceBetween = () => {
    switch (type) {
      case "preview":
        return -240; // 일반적인 간격
      case "chat":
      default:
        return -145; // 겹치는 간격
    }
  };

  return (
    <div className="w-[full] ">
      <Swiper
        modules={[FreeMode]}
        spaceBetween={getSpaceBetween()}
        slidesPerView="auto"
        freeMode={true}
        onProgress={(_, progress) => {
          setProgress(progress);
        }}
        className="w-full h-auto "
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
