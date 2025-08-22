import React, { useState, useEffect } from "react";
import PlacePreview from "../components/PlacePreview";
import GetNearFood from "../../../api/GetNearFood";
import { useLocationStore } from "../../../stores/uselocationStore";

const index = () => {
  const [placeContent, setPlaceContent] = useState([]);
  const { locationId } = useLocationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Current locationId:", locationId); // 디버그용 로그 추가

        if (!locationId) {
          console.warn("LocationId is not available yet");
          return;
        }

        const data = await GetNearFood(2); // locationId, 반경 설정 필요
        setPlaceContent(data);
        console.log("data랑 placeContent", data, placeContent);
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
