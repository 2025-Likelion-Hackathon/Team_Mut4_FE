import React from "react";
import ChatView from "./ChatView";

const index = () => {
  const chatViews = [
    { title: "토박이에게 물어보기", link: "/chatbot" },
    // 저장 리스트 개수 api 연동 필요
    { title: "저장 리스트", link: "/history" },
  ];
  return (
    <div className="w-full h-auto bg-white mb-5">
      <div className="pl-[14px] pt-[42px] font-bold text-[22px]">
        <p>환영합니다!</p>
        <p>당신을 위한 여행 가이드,</p>
        <p>토박이가 준비해봤어요</p>
      </div>
      <div className="p-[9px] gap-[20px] flex justify-center">
        {chatViews.map((chatView, index) => (
          <ChatView
            key={index}
            sub={chatView.sub}
            title={chatView.title}
            link={chatView.link}
          />
        ))}
      </div>
    </div>
  );
};

export default index;
