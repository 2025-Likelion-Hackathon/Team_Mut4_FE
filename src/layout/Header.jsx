import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="sticky w-full h-[70px] z-50 top-0  flex justify-between items-center pt-2 pb-2 pr-4 pl-4 text-black text-[19px] font-bold bg-white ">
      <div className="">홈(서비스 이름)</div>
    </div>
  );
};

export default Header;
