import { create } from 'zustand';

const dummyData = {
  name: '숙소 이름',
  grade: '호텔 5성급',
  location: '서울 강남구 강남대로 378 . 지상1층',
  phone: '000-0000-0000',
  sns: 'https://www.instagram.com/ddd_Ss',
  localReview: {
    grade: '현지인 등급 A 숙소에요',
    averagePrice: 5000,
  },
};

export const useAccommodationDetailsStore = create((set) => ({
  accommodation: null,
  fetchAccommodationData: () => {
    set({ accommodation: dummyData });
  },
}));