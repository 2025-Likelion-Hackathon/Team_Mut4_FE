// src/stores/useTabStore.js
import { create } from "zustand";

export const useLocationStore = create((set) => ({
  locationId: null,
  address: "",
  userType: "local", // 기본값은 'local'

  setAddress: (address) => {
    // "시"가 포함된 단어만 추출하는 함수
    const extractCityName = (fullAddress) => {
      if (!fullAddress) return "";

      // 주소를 공백으로 분리하여 배열로 만듦
      const addressParts = fullAddress.split(" ");

      // "시"로 끝나는 단어를 찾기
      const cityPart = addressParts.find((part) => part.endsWith("시"));

      return cityPart || fullAddress; // "시"가 포함된 단어가 없으면 원본 주소 반환
    };

    const cityName = extractCityName(address);
    set({ address: cityName });
  },
  setLocationId: (locationId) => set({ locationId }),
  setUserType: (userType) => set({ userType }),
}));
