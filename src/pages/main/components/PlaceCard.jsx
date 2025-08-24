import React, { useState } from "react";
import Mark from "../../../assets/Bookmark.svg?react";
import { Link } from "react-router-dom";
import Bg from "../../../assets/BackGround.svg?react";
import AtBook from "../../../assets/Iconex/Filled/Bookmark.svg?react";
import Book from "../../../assets/Iconex/Light/Bookmark.svg?react";

// PlaceCard 컴포넌트는 숙소나 맛집의 정보를 표시하는 카드 형태로 구성됩니다.
// address, name, price 등의 props를 받아 해당 정보를 표시합니다.
const PlaceCard = ({
  address,
  name,
  price,
  id,
  onBookmark,
  isBookmarked: initialBookmarked = false,
  place,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleBookmarkClick = async () => {
    if (onBookmark) {
      const success = await onBookmark(id);
      if (success !== false) {
        // API 호출이 성공했거나 결과를 반환하지 않은 경우
        setIsBookmarked(!isBookmarked);
      }
    }
  };
  return (
    <div className="relative w-[156px] h-[199px] mt-[27px] overflow-hidden rounded-[8px]">
      {/* 배경 SVG */}
      <div className="absolute inset-0">
        <Bg
          className="w-full h-full object-cover"
          style={{ filter: "blur(2px)" }}
        />
      </div>

      {/* 콘텐츠 - 배경 위에 표시 */}
      <div className="relative z-10 flex flex-col gap-[20px] pt-[13px] pl-[10px] h-full">
        <div className="flex flex-col gap-[70px]">
          <div className="flex justify-between pr-2">
            <div className="flex flex-col gap-[5px] w-[120px]">
              <div className="text-[15px] font-bold w-full h-[23px] text-white drop-shadow-md">
                {name}
              </div>
              <div className="text-[12px] w-full h-[40px] text-white drop-shadow-md">
                {address}
              </div>
            </div>
            {/* 북마크 아이콘 눌렀을시 찜 전용 api 연동 필요 */}
            {isBookmarked ? (
              <AtBook
                className="drop-shadow-md cursor-pointer"
                onClick={handleBookmarkClick}
              />
            ) : (
              <Book
                className="drop-shadow-md cursor-pointer"
                onClick={handleBookmarkClick}
              />
            )}
          </div>
          <div className="flex text-[12px] font-bold gap-[10px]">
            <div className="w-[50px] h-[21px] rounded-[10px] bg-[#D9D9D9] text-center bg-opacity-90">
              절약
            </div>
            <div className="text-white drop-shadow-md">
              {place === "restaurant"
                ? "5000원"
                : place === "accommodation"
                  ? "20000원"
                  : price}
            </div>{" "}
            {/* 가격 정보 표시 필요 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
