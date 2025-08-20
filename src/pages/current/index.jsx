import React from "react";
import { Link } from "react-router-dom";

function LocationAuthPage() {
  return (
    <div className="flex flex-col pl-4 gap-[120px] h-screen">
      <div className="flex flex-col justify-center h-[200px] text-[24px] font-bold mt-20">
        <div>반가워요!</div>
        <div>여행하러 오셨나요?</div>
      </div>
      <div className="flex gap-5 w-full h-[200px] text-[16px] font-bold pr-4">
        <Link
          to="/location"
          className="w-1/2 h-full  flex items-center justify-center bg-gray-200 rounded-lg"
        >
          {" "}
          현지인 입니다{" "}
        </Link>
        {/* 당근 형식 현지인 지역 설정 */}
        <Link
          to="/main"
          className="w-1/2 h-full flex items-center justify-center bg-gray-200 rounded-lg"
        >
          {" "}
          여행객 입니다{" "}
        </Link>
        {/* 현재 위치 기반으로 설정 */}
      </div>
    </div>
  );
}

export default LocationAuthPage;
