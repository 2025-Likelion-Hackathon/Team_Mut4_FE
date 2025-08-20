/**
 * 현재 위치 정보를 서버에 전송하는 API 함수
 * @param {number} latitude - 위도
 * @param {number} longitude - 경도
 * @returns {Promise<Object>} - 서버 응답 데이터
 */
const postCurrentLocation = async (latitude, longitude) => {
  try {
    // 환경 변수에서 API URL 가져오기
    const apiUrl =
      import.meta.env.VITE_LOCATION_API_URL ||
      `${import.meta.env.VITE_API_BASE_URL}/locations`;

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
