import React from "react";

// PlaceCard 컴포넌트는 숙소나 맛집의 정보를 표시하는 카드 형태로 구성됩니다.
// location, name, price 등의 props를 받아 해당 정보를 표시합니다.
const PlaceCard = ({ location, name, price }) => {
  return (
    <div className="flex flex-col bg-white w-[156px]  h-[156px] gap-[20px] w-[255px] h-[160px] border-[1px] rounded-[8px]  mt-[27px] pt-[13px] pl-[10px]">
      <div className="flex flex-col gap-[60px] ">
        <div>
          <div className="text-[12px]">{location} </div>
          <div className="text-[15px] font-bold">{name} </div>
        </div>
        <div className="flex text-[12px] font-bold gap-[10px]">
          <div className="w-[50px] h-[21px] rounded-[10px] bg-[#D9D9D9] text-center">
            가격
          </div>
          <div>{price}</div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
