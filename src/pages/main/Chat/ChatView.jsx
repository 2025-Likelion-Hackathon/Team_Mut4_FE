import React from "react";
import { Link } from "react-router-dom";
import Go from "../../../assets/Go.svg?react";

const ChatView = ({ title, link, num }) => {
  return (
    <div className="flex w-[190px] h-[123.52px] border-[1px] rounded-[8px] mt-[27px] p-[10px]">
      <div className="flex justify-between items-start w-full text-[17px] font-medium text-gray-700">
        <div className="flex items-start ">
          <p className="w-[85px]">{title}</p>
          {num ? (
            <div className="w-[16px] h-[16px] mt-[5px] text-[12px] flex justify-center items-center rounded-[24px] bg-[#F0F0F0]">
              {num}
            </div>
          ) : null}
        </div>

        <Link to={link} className="pt-[7px]">
          <Go />
        </Link>
      </div>
    </div>
  );
};

export default ChatView;
