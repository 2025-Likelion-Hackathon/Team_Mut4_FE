import React from "react";
import PlacePreview from "../components/PlacePreview";

const index = () => {
  // 추후 api 연동 후 zustand로 상태 관리 필요
  const placeContent = [
    {
      location: "강남",
      name: "호텔",
      price: "100,000원",
    },
    {
      location: "강남",
      name: "호텔",
      price: "100,000원",
    },
    {
      location: "강남",
      name: "호텔",
      price: "100,000원",
    },
  ];
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <PlacePreview title="현지인 숙소 추천" content={placeContent} type="accommodation" />
    </div>
  );
};

export default index;
