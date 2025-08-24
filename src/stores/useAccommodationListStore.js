import { create } from 'zustand';
import axios from 'axios';

export const useAccommodationListStore = create((set) => ({
  accommodations: [],
  isLoading: true,
  error: null,

  fetchAccommodations: async (locationId) => {
    if (!locationId) {
      return set({ accommodations: [], isLoading: false });
    }
    set({ isLoading: true, error: null });
    try {
      const listEndpoint = `/locations/${locationId}/nearby-accommodation-all`;
      const bookmarksEndpoint = `/location-accommodation-bookmarks/${locationId}`;

      const [listResponse, bookmarksResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}${listEndpoint}`, { params: { radius: 2000 } }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}${bookmarksEndpoint}`)
      ]);
      
      const allAccommodations = listResponse.data;
      const bookmarkedIds = new Set(bookmarksResponse.data.map(b => b.id));

      const mergedList = allAccommodations.map(acc => ({
        ...acc,
        isBookmarked: bookmarkedIds.has(acc.id)
      }));

      set({ accommodations: mergedList, isLoading: false });
    } catch (err) {
      console.error("숙소 목록 로딩 실패:", err);
      set({ error: "목록을 불러오는 데 실패했습니다.", isLoading: false });
    }
  },

  searchAccommodations: async (locationId, keyword) => {
    console.log('2️⃣ 숙소 스토어: searchAccommodations 함수가 호출되었습니다!');
    if (!locationId || !keyword.trim()) return;
    set({ isLoading: true, error: null });
    try {
      const endpoint = `/locations/${locationId}/search`;
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
        params: { keyword, radius: 2000 },
      });
      
      const searchResult = response.data.map(r => ({ ...r, isBookmarked: false }));
      
      set({ accommodations: searchResult, isLoading: false });
    } catch (err) {
      console.error("숙소 검색 실패:", err);
      set({ error: "검색 결과를 불러오는 데 실패했습니다.", isLoading: false });
    }
  },
  
  toggleBookmarkStatus: (accommodationId, newStatus) => {
    set(state => ({
      accommodations: state.accommodations.map(acc => 
        acc.id === accommodationId ? { ...acc, isBookmarked: newStatus } : acc
      )
    }));
  },
}));