import React from "react";

import Box from "../../../assets/box.svg?react";
import Box2 from "../../../assets/box2.svg?react";
import { Link } from "react-router-dom";
const index = () => {
  return (
    <div className="w-full h-auto bg-white mb-5 pl-[14px] pr-[14px]">
      <div className=" pt-[42px] font-bold text-[22px]">
        <div className="text-[#01D281] text-[20px] font-medium mb-[6px]">
          환영합니다!
        </div>
        <p>당신을 위한 여행 가이드,</p>
        <p>토박이가 준비해봤어요</p>
      </div>
      <div className="flex w-full pt-[24px] justify-between">
        <Link to="/chatbot">
          <Box />
        </Link>
        <Link to="/history">
          <Box2 />
        </Link>
      </div>
    </div>
  );
};

export default index;
