import React, { useState, useEffect } from "react";
import PlacePreview from "../components/PlacePreview";
import GetNearAccomodation from "../../../api/GetNearAccomodation";
import postAccomBookmark from "../../../api/MainACBook";
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

        const data = await GetNearAccomodation(locationId); // locationId, 반경 설정 필요
        setPlaceContent(data);
      } catch (error) {
        console.error("Error fetching nearby accommodation:", error);
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

  const handleAccomBookmark = async (accommodationId) => {
    try {
      const result = await postAccomBookmark(locationId, accommodationId);
      if (result.success) {
        return true;
      } else {
        console.error("숙소 북마크 추가 실패:", result.error);
        return false;
      }
    } catch (error) {
      console.error("북마크 처리 중 오류:", error);
      return false;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <PlacePreview
        title="현지인 숙소 추천"
        content={placeContent}
        link="/accommodation"
        onBookmark={handleAccomBookmark}
      />
    </div>
  );
};

export default index;
