import { create } from 'zustand';
import axios from 'axios';

export const useRestaurantListStore = create((set) => ({
  restaurants: [],
  isLoading: true,
  error: null,

  searchRestaurants: async (locationId, keyword) => {
    set({ isLoading: true, error: null });
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${baseUrl}/locations/${locationId}/search`, {
        params: {
          keyword: keyword,
          radius: 2000,
        },
      });

      const mappedRestaurants = response.data.map(item => ({
        id: item.id,
        name: item.placeName,
        placeName: item.placeName,
        address: item.addressName,
        addressName: item.addressName,
        roadAddress: item.roadAddressName,
        roadAddressName: item.roadAddressName,
        phone: item.phone,
        placeUrl: item.placeUrl,
        latitude: item.latitude,
        longitude: item.longitude,
        categoryName: item.categoryName,
        averageGrade: item.averageGrade,
        restaurantPrice: item.averagePrice,
        priceDifference: item.priceDifference,
        foodAveragePrice: item.averagePrice + item.priceDifference,
      }));

      set({ restaurants: mappedRestaurants, isLoading: false });
    } catch (error) {
      console.error("Search failed:", error);
      set({ error: '검색에 실패했습니다.', isLoading: false, restaurants: [] });
    }
  },

  fetchRestaurants: async (locationId, filter = '거리순') => {
    if (!locationId) {
      return set({ restaurants: [], isLoading: false });
    }
    set({ isLoading: true, error: null });
    try {
      let listEndpoint = `/locations/${locationId}/nearby-food-all`;
      if (filter === '등급순') {
        listEndpoint += '/grade';
      }
      const bookmarksEndpoint = `/location-food-bookmarks/${locationId}`;

      const [listResponse, bookmarksResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}${listEndpoint}`, { params: { radius: 2000 } }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}${bookmarksEndpoint}`)
      ]);
      
      const allRestaurants = listResponse.data;
      const bookmarkedIds = new Set(bookmarksResponse.data.map(b => b.id));

      const mergedList = allRestaurants.map(r => ({
        ...r,
        isBookmarked: bookmarkedIds.has(r.id)
      }));

      set({ restaurants: mergedList, isLoading: false });
    } catch (err) {
      console.error("레스토랑 목록 로딩 실패:", err);
      set({ error: "목록을 불러오는 데 실패했습니다.", isLoading: false });
    }
  },

  searchRestaurants: async (locationId, keyword) => {
    if (!locationId || !keyword.trim()) return;
    set({ isLoading: true, error: null });
    try {
      const endpoint = `/locations/${locationId}/search`;
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
        params: { keyword, radius: 2000 },
      });

      const searchResult = response.data.map(r => ({ ...r, isBookmarked: false }));
      
      set({ restaurants: searchResult, isLoading: false });

    } catch (err) {
      console.error("레스토랑 검색 실패:", err);
      set({ error: "검색 결과를 불러오는 데 실패했습니다.", isLoading: false });
    }
  },
  
  toggleBookmarkStatus: (foodId, newStatus) => {
    set(state => ({
      restaurants: state.restaurants.map(r => 
        r.id === foodId ? { ...r, isBookmarked: newStatus } : r
      )
    }));
  },
}));