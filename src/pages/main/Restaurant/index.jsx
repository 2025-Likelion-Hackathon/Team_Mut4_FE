import React, { useState, useEffect } from "react";
import PlacePreview from "../components/PlacePreview";
import GetNearFood from "../../../api/GetNearFood";
import postFoodBookmark from "../../../api/MainFBook";
import { useLocationStore } from "../../../stores/uselocationStore";

const index = () => {
  const [placeContent, setPlaceContent] = useState([]);
  const { locationId } = useLocationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!locationId) {
          console.warn("LocationId is not available yet");
          return;
        }

        const data = await GetNearFood(locationId); // locationId, 반경 설정 필요
        setPlaceContent(data);
      } catch (error) {
        console.error("Error fetching nearby food:", error);
        // 더 자세한 에러 정보 로깅
        if (error.response) {
          console.error(
            "Error response:",
            error.response.status,
            error.response.data
          );
        }
      }
    };

    fetchData();
  }, [locationId]); // locationId가 변경될 때마다 다시 실행

  const handleFoodBookmark = async (foodId) => {
    try {
      const result = await postFoodBookmark(locationId, foodId);
      if (result.success) {
        console.log("음식 북마크 추가 성공:", result.data);
        return true;
      } else {
        console.error("음식 북마크 추가 실패:", result.error);
        return false;
      }
    } catch (error) {
      console.error("북마크 처리 중 오류:", error);
      return false;
    }
  };

  return (
    <div className="flex flex-col  ">
      <PlacePreview
        title="현지인 인증 맛집"
        content={placeContent}
        link="/restaurant"
        onBookmark={handleFoodBookmark}
      />
    </div>
  );
};

export default index;
