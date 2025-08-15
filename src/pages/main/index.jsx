import React from "react";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import Restaurant from "./Restaurant";
import Accommodation from "./Accommodation";
function MainPage() {
  return (
    <div className="flex flex-col h-full bg-white">
      <Chat /> {/* Ai 챗봇 대화 기록 연동 필요 */}
      <Restaurant /> {/* 맛집 미리보기 관련 api 연동 필요  */}
      <Accommodation /> {/* 숙소 미리보기 관련 api 연동 필요 */}
    </div>
  );
}

export default MainPage;
