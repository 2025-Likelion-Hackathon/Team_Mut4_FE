import React from "react";
import ChatView from "./ChatView";
import ChatList from "./ChatList";
import CardSlice from "../components/CardSlice";

const index = () => {
  const chatListContents = ["1번 대화 내용", "2번 대화 내용", "3번 대화 내용"];

  const cards = [
    ChatView,
    ...chatListContents.map((content) => () => <ChatList content={content} />),
  ];

  return (
    <div className="w-full h-auto bg-white mb-5">
      <div className="pl-[14px] pt-[42px] font-bold text-[22px]">
        <p>환영합니다</p>
        <p>당신을 위한 여행 가이드,</p>
        <p>토박이가 준비해봤어요</p>
      </div>
      <div className="pl-[9px]">
        <CardSlice cards={cards} />
      </div>
    </div>
  );
};

export default index;
