import React from "react";

const ChatList = ({ content = "ChatList" }) => {
  return (
    <div className="flex flex-col gap-[20px] w-[255px] h-[160px] border-[1px] rounded-[8px] ml-[8px] mt-[27px]">
      {content}
    </div>
  );
};

export default ChatList;
