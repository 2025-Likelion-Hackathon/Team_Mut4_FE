import React from "react";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import Restaurant from "./Restaurant";
import Accommodation from "./Accommodation";
import Pin from "../../assets/General/Location Pin.svg?react";

import { useLocationStore } from "../../stores/uselocationStore";

// 메인 페이지 컴포넌트

function MainPage() {
  const { userType, locationId, address } = useLocationStore();

  return (
    <div className="flex flex-col h-full bg-white">
      <Chat /> {/* Ai 챗봇 대화 기록 연동 필요 */}
      <div className="bg-gray-100 flex flex-col h-auto">
        <div className="flex  items-center p-4  gap-[13px]">
          <div className="text-[19px] font-bold ">
            <Pin className="inline-block mr-2" />
            {address} {/* 여행지 추천 페이지로 이동 */}
          </div>
          <Link
            to="/destination"
            className="w-[auto] h-[auto] text-[12px] bg-white rounded-[8px]  p-2 "
          >
            여행지 선택
          </Link>
        </div>
        <Restaurant /> {/* 맛집 미리보기 관련 api 연동 필요  */}
        <Accommodation /> {/* 숙소 미리보기 관련 api 연동 필요 */}
      </div>
    </div>
  );
}

export default MainPage;
