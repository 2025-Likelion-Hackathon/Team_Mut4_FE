import React from "react";
import PlaceCard from "./PlaceCard";
import CardSlice from "./CardSlice";
import Go from "../../../assets/Go.svg?react";
import { Link } from "react-router-dom";
import { useLocationStore } from "../../../stores/uselocationStore";
// PlacePreview 컴포넌트는 숙소나 맛집의 미리보기를 표시하는 컴포넌트입니다.
// title과 content를 props로 받아 해당 정보를 표시합니다.
// content는 PlaceCard 컴포넌트에 전달될 props의 배열입니다.
// 각 PlaceCard는 location, name, price 등의 정보를 표시합니다.

const PlacePreview = ({ title, link, content, type = "preview", onBookmark }) => {
  const { cityName } = useLocationStore();
  const cards = content.map((item, index) => () => (
    <PlaceCard key={index} {...item} onBookmark={onBookmark} />
  ));

  return (
    <div className="flex flex-col w-full h-auto bg-gray-100 pl-[14px] pt-[22px] pb-[20px]">
      <div className="flex justify-between items-center pr-[14px]">
        <div className="font-bold text-[18px] gap-[5px] flex items-center">
          {" "}
          <div>{cityName}</div>
          <div> {title}</div>
        </div>

        <Link to={link} className=" flex gap-[5px] items-center">
          더보기 <Go />
        </Link>
      </div>
      <div>
        <CardSlice cards={cards} type={type} />
      </div>
    </div>
  );
};

export default PlacePreview;
