// src/stores/useAccommodationDetailsStore.js
import { create } from 'zustand';
import axios from 'axios';

export const useAccommodationDetailsStore = create((set) => ({
  accommodation: null,
  isLoading: true,
  error: null,
  isLocal: true, // 현지인 여부 (임시값)

  // API 호출 액션
  fetchAccommodationData: async (accommodationId) => {
    set({ isLoading: true, error: null });
    try {
      const fullUrl = `${import.meta.env.VITE_API_BASE_URL}/accommodations/${accommodationId}`;
      const response = await axios.get(fullUrl);
      
      // API 응답 데이터를 스토어 상태에 저장
      set({ accommodation: response.data, isLoading: false });
    } catch (err) {
      console.error("Error fetching accommodation details:", err);
      set({ error: "숙소 정보를 불러오는 데 실패했습니다.", isLoading: false });
    }
  },
}));