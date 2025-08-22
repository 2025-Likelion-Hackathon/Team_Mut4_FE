import React from "react";
import Mark from "../../../assets/Bookmark.svg?react";
import { Link } from "react-router-dom";

// PlaceCard 컴포넌트는 숙소나 맛집의 정보를 표시하는 카드 형태로 구성됩니다.
// address, name, price 등의 props를 받아 해당 정보를 표시합니다.
const PlaceCard = ({ address, name, price }) => {
  return (
    <div className="flex flex-col bg-white w-[156px] h-[199px] gap-[20px]  border-[1px] rounded-[8px]  mt-[27px] pt-[13px] pl-[10px]">
      <div className="flex flex-col gap-[70px] ">
        <div className="flex justify-between pr-2">
          <div className="flex flex-col gap-[5px]">
            <div className="text-[15px] font-bold">{name} </div>
            <div className="text-[12px]">{address} </div>
          </div>
          {/* 북마크 아이콘 눌렀을시 찜 전용 api 연동 필요 */}
          <Mark />
        </div>
        <div className="flex text-[12px] font-bold gap-[10px]">
          <div className="w-[50px] h-[21px] rounded-[10px] bg-[#D9D9D9] text-center">
            절약
          </div>
          <div>{price} 예시 5000원</div> {/* 가격 정보 표시 필요 */}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
