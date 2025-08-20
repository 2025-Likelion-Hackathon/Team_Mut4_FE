import React, { useState } from "react";
import { Link } from "react-router-dom";
import GeoLocation from "../../api/GeoLocation"; // 위치 정보를 가져오는 유틸리티 함수
import postCurrentLocation from "../../api/CurrentLocation"; // 위치 정보를 서버에 전송하는 API

function LocationAuthPage() {
  const [location, setLocation] = useState(null);
  const [userType, setUserType] = useState("local");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);

  // 위치 정보 가져오기 및 서버 전송 함수
  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    setServerResponse(null);

    // GeoLocation 함수 호출 (성공 콜백, 에러 콜백, 사용자 타입 전달)
    GeoLocation(
      // 성공 콜백
      async (locationData) => {
        setLocation(locationData);
        console.log("위치 정보 저장 완료:", locationData);

        // 서버에 위치 정보 전송
        try {
          const result = await postCurrentLocation(
            locationData.latitude,
            locationData.longitude
          );

          if (result.success) {
            setServerResponse(result.data);
            console.log("서버 전송 성공:", result.data);
          } else {
            setError(`서버 전송 실패: ${result.error}`);
          }
        } catch (serverError) {
          setError(`서버 통신 오류: ${serverError.message}`);
        } finally {
          setLoading(false);
        }
      },
      // 에러 콜백
      (error) => {
        setError(error.message || "위치 정보를 가져올 수 없습니다.");
        setLoading(false);
        console.error("위치 정보 가져오기 실패:", error);
      }
      // 사용자 타입
    );
  };

  return (
    <div className="flex flex-col pl-4 gap-[120px] h-screen">
      <div className="flex flex-col justify-center h-[200px] text-[24px] font-bold mt-20">
        <div>반가워요!</div>
        <div>여행하러 오셨나요?</div>
      </div>
      <div className="flex gap-5 w-full h-[200px] text-[16px] font-bold pr-4">
        <Link
          to="/location"
          onClick={getCurrentLocation}
          onMouseEnter={() => setUserType("local")}
          className={`w-1/2 h-full flex items-center justify-center bg-gray-200 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "위치 확인 중..." : "현지인 입니다"}
        </Link>
        {/* 당근 형식 현지인 지역 설정 */}
        <Link
          to="/main"
          onClick={getCurrentLocation}
          onMouseEnter={() => setUserType("tourist")}
          className={`w-1/2 h-full flex items-center justify-center bg-gray-200 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "위치 확인 중..." : "여행객 입니다"}
        </Link>
        {/* 현재 위치 기반으로 설정 */}
      </div>

      {/* 에러 메시지 표시 */}
      {error && (
        <div className="px-4 text-center">
          <p className="text-red-500">오류: {error}</p>
        </div>
      )}

      {/* 위치 정보 표시 */}
      {location && (
        <div className="px-4 text-center">
          <p className="text-green-600">
            현재 위치: 위도 {location.latitude}, 경도 {location.longitude}
          </p>
          <p className="mt-2 text-sm text-gray-500">사용자 유형: {userType}</p>
        </div>
      )}

      {/* 서버 응답 표시 */}
      {serverResponse && (
        <div className="px-4 text-center mt-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-700 font-bold">서버 응답:</p>
            <pre className="text-sm text-blue-600 mt-2">
              {JSON.stringify(serverResponse, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationAuthPage;
