import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className=" h-16 bg-gray-300 flex items-center justify-around text-sm text-gray-500">
      {/* Nav Item 1 */}
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 bg-gray-500 rounded-full mb-1"></div>{" "}
        {/* Icon Placeholder */}
        <Link to="/main">Home</Link>
      </div>
      {/* Nav Item 2 */}
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 bg-gray-500 rounded-full mb-1"></div>{" "}
        {/* Icon Placeholder */}
        <Link to="/chatbot">여행 가이드</Link>
      </div>
      {/* Nav Item 3 */}
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 bg-gray-500 rounded-full mb-1"></div>{" "}
        {/* Icon Placeholder */}
        <Link to="/restaurant">현지인 추천</Link>
      </div>
    </div>
  );
};

export default Navbar;
