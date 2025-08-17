import React from "react";
import PlacePreview from "../components/PlacePreview";

const index = () => {
  // 추후 api 연동 후 zustand로 상태 관리 필요
  const placeContent = [
    {
      location: "강남",
      name: "밥집",
      price: "100,000원",
    },
    {
      location: "강남",
      name: "밥집",
      price: "100,000원",
    },
    {
      location: "강남",
      name: "밥집",
      price: "100,000원",
    },
  ];
  return (
    <div className="flex flex-col  ">
      <PlacePreview
        title="현지인 인증 맛집"
        content={placeContent}
        link="/restaurant"
      />
    </div>
  );
};

export default index;
