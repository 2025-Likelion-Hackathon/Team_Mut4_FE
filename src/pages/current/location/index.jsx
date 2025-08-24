import React, { useState, useEffect } from "react";
import KakaoSearchMap from "../../travelDestination/components/KakaoSearchMap";
import { useLocationStore } from "../../../stores/uselocationStore";
import Go from "../../../assets/Arrow/Arrow Left 2.svg?react";
import { Link } from "react-router-dom";

const index = () => {
  const { address } = useLocationStore();
  const [mapHeight, setMapHeight] = useState(410);
  const [bottomHeight, setBottomHeight] = useState(200);
  // 화면 크기에 따른 지도 높이와 하단 높이 계산
  const calculateHeights = () => {
    const height = window.innerHeight;
    const headerHeight = 58; // 헤더 높이
    const availableHeight = height - headerHeight;

    const calculatedMapHeight = Math.floor(availableHeight * 0.75);
    const calculatedBottomHeight = availableHeight - calculatedMapHeight;

    return {
      mapHeight: calculatedMapHeight,
      bottomHeight: calculatedBottomHeight,
    };
  };

  // 컴포넌트 마운트 시와 화면 크기 변경 시 높이 업데이트
  useEffect(() => {
    const updateHeights = () => {
      const { mapHeight, bottomHeight } = calculateHeights();
      setMapHeight(mapHeight);
      setBottomHeight(bottomHeight);
    };

    // 초기 높이 설정
    updateHeights();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", updateHeights);

    // 클린업
    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="w-full h-[58px] flex items-center p-4 bg-white ">
        <Link to="/auth">
          <Go />
        </Link>
        <div className="ml-[32%] font-bold">내 동네 설정</div>
      </div>
      <div className="w-full h-full bg-white flex-1 flex flex-col relative">
        <div className={`flex-1 h-[${mapHeight}px]`}>
          <KakaoSearchMap defaultKeyword={address} height={mapHeight} />
        </div>
        <div
          className="flex flex-col justify-center items-center bottom-0 gap-[10%] w-full bg-white rounded-t-2xl p-4 transition-all duration-300 ease-in-out"
          style={{ height: bottomHeight }}
        >
          <div className="flex gap-2 items-center text-center">
            <div className="text-bold text-[#01D281] text-[26px]">
              {address}
            </div>
            <div className="text-[22px] text-medium">에 살고 계시네요!</div>
          </div>
          <Link
            to="/main"
            className="w-full h-12 rounded-[8px] bg-[#01D281] text-white flex items-center justify-center mt-4"
          >
            시작하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default index;
