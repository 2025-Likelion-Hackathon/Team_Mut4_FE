import { create } from "zustand";

export const useLocationStore = create((set) => ({
  locationId: null,

  address: "", // 시 /군/구 단위로 저장
  cityName: "", // 시/군/구에서 시 이름만 저장
  userType: "local", // 기본값은 'local'

  latitude: null,
  longitude: null,
  setAddress: (address) => {
    if (!address) return;

    // "시/군/구"까지 추출하는 함수
    const extractCityAndDistrict = (fullAddress) => {
      const addressParts = fullAddress.split(" ");
      let result = "";

      // 시/특별시/광역시 찾기
      const cityIndex = addressParts.findIndex(
        (part) =>
          part.endsWith("시") ||
          part.endsWith("특별시") ||
          part.endsWith("광역시")
      );

      if (cityIndex !== -1) {
        result = addressParts[cityIndex];

        // 그 다음에 구/군이 있는지 확인
        if (cityIndex + 1 < addressParts.length) {
          const nextPart = addressParts[cityIndex + 1];
          if (nextPart.endsWith("구") || nextPart.endsWith("군")) {
            result += " " + nextPart;
          }
        }
      }

      return result || fullAddress; // 추출 실패 시 원본 반환
    };

    const processedAddress = extractCityAndDistrict(address);
    set({ address: processedAddress });
  },

  setLocationId: (locationId) => set({ locationId }),
  setUserType: (userType) => set({ userType }),
  setCityName: (cityName) => set({ cityName }),
}));
