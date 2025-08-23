/**
 * 음식 북마크를 추가하는 API 함수
 * @param {number} locationId - 위치 ID
 * @param {number} foodId - 음식 ID
 * @returns {Promise<Object>} - 서버 응답 데이터
 */
const postAccomBookmark = async (locationId, accommodationId) => {
  try {
    // 환경 변수에서 API URL 가져오기
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const apiUrl = `${baseUrl}/location-accommodation-bookmarks?locationId=${locationId}&accommodationId=${accommodationId}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        accept: "*/*",
      },
      body: "",
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
    console.error("음식 북마크 추가 중 오류 발생:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default postAccomBookmark;
