/**
 * 현재 위치 정보를 서버에 전송하는 API 함수
 * @param {number} latitude - 위도
 * @param {number} longitude - 경도
 * @returns {Promise<Object>} - 서버 응답 데이터
 */
const postCurrentLocation = async (latitude, longitude) => {
  try {
    // 디버깅: 환경 변수 확인
    console.log("🔧 환경 변수 확인:", {
      DEV: import.meta.env.DEV,
      VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
      VITE_LOCATION_API_URL: import.meta.env.VITE_LOCATION_API_URL,
    });

    // Vite 환경 변수 올바른 사용법
    const apiUrl = import.meta.env.DEV
      ? "/locations" // 개발 환경: 프록시 사용
      : import.meta.env.VITE_LOCATION_API_URL ||
        `${import.meta.env.VITE_API_BASE_URL}/locations`;

    console.log("📡 API 요청 URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude,
        longitude,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("서버 응답:", data);
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("현재 위치 정보를 서버에 전송하는 중 오류 발생:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default postCurrentLocation;
