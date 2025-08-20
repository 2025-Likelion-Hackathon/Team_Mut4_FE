/**
 * 현재 위치 정보를 가져오는 유틸리티 함수
 * @param {function} onSuccess - 성공 시 호출될 콜백 함수 (latitude, longitude를 인자로 받음)
 * @param {function} onError - 실패 시 호출될 콜백 함수 (error를 인자로 받음)
 * @param {string} userType - 사용자 타입 (선택적)
 */
const GeoLocation = (onSuccess, onError, userType = "unknown") => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(
          `위도: ${latitude}, 경도: ${longitude}, 사용자 유형: ${userType}`
        );

        // 성공 콜백 호출
        if (onSuccess && typeof onSuccess === "function") {
          onSuccess({ latitude, longitude });
        }
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다:", error);

        // 에러 콜백 호출
        if (onError && typeof onError === "function") {
          onError(error);
        }
      },
      {
        enableHighAccuracy: true, // 높은 정확도
        timeout: 10000, // 10초 타임아웃
        maximumAge: 300000, // 5분간 캐시된 위치 정보 사용
      }
    );
  } else {
    const error = new Error("Geolocation이 지원되지 않습니다.");
    console.error(error.message);

    if (onError && typeof onError === "function") {
      onError(error);
    }
  }
};

export default GeoLocation;
