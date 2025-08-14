import React, { useState } from "react";
import ChatView from "./ChatView";
import ChatList from "./ChatList";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
const index = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div className="w-full h-[370px] bg-white">
      <div className="pl-[14px] pt-[42px] font-bold text-[22px]">
        <p>환영합니다</p>
        <p>당신을 위한 여행 가이드,</p>
        <p>토박이가 준비해봤어요</p>
      </div>
      <div className="w-[full] pl-[9px]">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={-145}
          slidesPerView="auto"
          freeMode={true}
          onProgress={(swiper, progress) => {
            setProgress(progress);
          }}
          className="w-full h-[190px] "
        >
          <SwiperSlide className="w-[255px]">
            <ChatView />
          </SwiperSlide>
          <SwiperSlide className="w-[255px]">
            <ChatList /> {/* ai 채팅 내용 연결 필요*/}
          </SwiperSlide>
          <SwiperSlide className="w-[255px]">
            <ChatList />
          </SwiperSlide>
          <SwiperSlide className="w-[255px]">
            <ChatList />
          </SwiperSlide>
        </Swiper>

        {/* Custom Progress Bar */}
        <div className="w-1/2 px-[9px] mt-4 mx-auto">
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
