import React from "react";
import { Link } from "react-router-dom";
import Go from "../../../assets/Go.svg?react";

const ChatView = () => {
  return (
    <div className="flex flex-col gap-[20px] w-[255px] h-[160px] border-[1px] rounded-[8px] ml-[8px] mt-[27px]">
      <div className="text-[17px] font-medium text-gray-700 p-4">
        <p>합리적인 여행</p>
        <p>토박이와 함께해요!</p>
      </div>
      <div className="flex justify-end text-[13px] w-full h-[40px]">
        <Link to="/chatbot" className="flex items-center gap-[4px] p-4">
          토박이에게 바로가기 <Go />
        </Link>
      </div>
    </div>
  );
};

export default ChatView;
