import React from "react";

const Header = () => {
  return (
    <div className="sticky w-full h-[70px] z-50 top-0  flex justify-between items-center pt-2 pb-2 pr-4 pl-4 text-black text-[19px] font-bold bg-white ">
      <div className="">홈</div>
      {/* Placeholder for text top-right */}
      <div className="">지역</div>
    </div>
  );
};

export default Header;
