// src/stores/useTabStore.js
import { create } from "zustand";

export const useLocationStore = create((set) => ({
  locationId: null,
  address: "",
  userType: "local", // 기본값은 'local'

  //전체 주소 반환하게 변경 ( 시/구/군 반영시 오류 발생 )
  setAddress: (address) => {
    if (!address) return;
    set({ address });
  },
  setLocationId: (locationId) => set({ locationId }),
  setUserType: (userType) => set({ userType }),
}));
