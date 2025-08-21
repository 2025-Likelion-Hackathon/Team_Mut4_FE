import React, { useState, useEffect } from "react";
import KakaoSearchMap from "../../travelDestination/components/KakaoSearchMap";
import { useLocationStore } from "../../../stores/uselocationStore";
import Go from "../../../assets/Arrow/Arrow Left 2.svg?react";
import { Link } from "react-router-dom";

const index = () => {
  const { address } = useLocationStore();
  const [mapHeight, setMapHeight] = useState(410);

  // 화면 너비에 따른 지도 높이 계산
  const calculateMapHeight = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width === 420 && height === 900) {
      return 723;
    } else if (width === 414 && height === 896) {
      return 640;
    } else if (width === 390 && height === 844) {
      return 590;
    } else if (width === 375 && height === 667) {
      return 410;
    } else {
      return 723; // 기본값
    }
  };

  // 컴포넌트 마운트 시와 화면 크기 변경 시 높이 업데이트
  useEffect(() => {
    const updateHeight = () => {
      setMapHeight(calculateMapHeight());
    };

    // 초기 높이 설정
    updateHeight();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", updateHeight);

    // 클린업
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="w-full h-[58px] flex items-center p-4 bg-white gap-1/3">
        <Link to="/auth">
          <Go />
        </Link>
        <div className="font-bold">내 동네 설정</div>
      </div>
      <div className="w-full h-full bg-white flex-1 flex flex-col relative">
        <div className="flex-1 h-0">
          <KakaoSearchMap defaultKeyword={address} height={mapHeight} />
        </div>
        <div className="flex flex-col justify-center items-center bottom-0 gap-[30px] w-full h-[200px] bg-white rounded-t-2xl p-4">
          <div className="flex gap-2 items-center text-center">
            <div className="text-bold text-[26px]">{address}</div>
            <div className="text-[22px] text-medium">에 살고 계시네요!</div>
          </div>
          <Link
            to="/main"
            className="w-full h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mt-4"
          >
            시작하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default index;
