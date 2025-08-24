import React from "react";
import { Link, useLocation } from "react-router-dom";
import Home from "../assets/Iconex/Filled/Home.svg?react";
import Guide from "../assets/Iconex/Filled/Message square.svg?react";
import Map from "../assets/Map.svg?react";

const Navbar = () => {
  const location = useLocation();

  // 현재 경로가 해당 메뉴와 일치하는지 확인하는 함수
  const isActive = (path) => {
    if (path === "/restaurant") {
      // /restaurant로 시작하는 모든 경로를 활성화
      return location.pathname.startsWith("/restaurant");
    }
    return location.pathname === path;
  };

  // 활성/비활성 상태에 따른 색상 클래스 반환
  const getTextColor = (path) =>
    isActive(path) ? "text-[#01D281]" : "text-[#8F8F8F]";
  const getIconClass = (path) =>
    `w-6 h-6 mb-1 ${isActive(path) ? "text-[#01D281]" : "text-[#8F8F8F]"} [&>*]:fill-current [&>*]:stroke-current`;
  return (
    <div className="h-16 bg-[#ffffff] flex items-center justify-around text-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      {/* Nav Item 1 - 홈 */}
      <div className="flex flex-col items-center">
        <Home className={getIconClass("/main")} />
        <Link to="/main" className={getTextColor("/main")}>
          홈
        </Link>
      </div>

      {/* Nav Item 2 - AI 가이드 */}
      <div className="flex flex-col items-center">
        <Guide className={getIconClass("/chatbot")} />
        <Link to="/chatbot" className={getTextColor("/chatbot")}>
          AI 가이드
        </Link>
      </div>

      {/* Nav Item 3 - 현지인추천 */}
      <div className="flex flex-col items-center">
        <Map className={getIconClass("/restaurant")} />
        <Link to="/restaurant" className={getTextColor("/restaurant")}>
          현지인추천
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
