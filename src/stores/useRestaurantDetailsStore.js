// src/stores/useRestaurantDetailsStore.js
import { create } from 'zustand';
import axios from 'axios';

export const useRestaurantDetailsStore = create((set) => ({
  restaurant: null,
  isLoading: true,
  error: null,

  // API 호출 액션
  fetchRestaurantData: async (foodId) => {
    set({ isLoading: true, error: null });
    try {
      const fullUrl = `${import.meta.env.VITE_API_BASE_URL}/foods/${foodId}`;
      const response = await axios.get(fullUrl);
      
      // API 응답 데이터를 스토어 상태에 저장
      set({ restaurant: response.data, isLoading: false });
    } catch (err) {
      console.error("Error fetching restaurant details:", err);
      set({ error: "음식점 정보를 불러오는 데 실패했습니다.", isLoading: false });
    }
  },
}));