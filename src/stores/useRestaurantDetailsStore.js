import { create } from 'zustand';

const dummyData = {
  name: '가게 이름',
  category: '음식점>한식>고깃집',
  address: '서울 강남구 강남대로 378 . 지상1층',
  phone: '000-0000-0000',
  instagram: 'https://www.instagram.com/ddd_5s',
  discount: '5000원 절약',
  rating: '인증 등급 A',
  menus: [
    { name: '메뉴이름 A', price: '10,000 원' },
    { name: '메뉴이름 A', price: '10,000 원' },
    { name: '메뉴이름 A', price: '10,000 원' },
    { name: '메뉴이름 A', price: '10,000 원' },
    { name: '메뉴이름 A', price: '10,000 원' },
  ],
  localReview: {
    grade: '인증 등급 A',
    averagePrice: '5000',
    reviewTypes: [
      { type: '맛있어요', count: 20 },
      { type: '맛있어요', count: 20 },
      { type: '맛있어요', count: 20 },
    ]
  }
};

export const useRestaurantDetailsStore = create((set) => ({
  restaurant: null,
  isLocal: true,
  fetchRestaurantData: () => {
    set({ restaurant: dummyData });
    // 실제 API 연동 시 현지인 여부 판단 로직을 여기에 추가
    // set({ isLocal: determineIfLocalUser() });
  },
}));