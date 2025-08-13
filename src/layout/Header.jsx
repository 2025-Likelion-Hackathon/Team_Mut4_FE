import React from "react";

const Header = () => {
  return (
    <div className="sticky w-full h-[70px] z-50 top-0  flex justify-between items-center p-4 text-black bg-white shadow-md">
      <div className="text-lg font-bold">App Logo</div>
      {/* Placeholder for text top-right */}
      <div className="text-sm">User Info</div>
    </div>
  );
};

export default Header;
