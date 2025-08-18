// src/stores/useTabStore.js
import { create } from 'zustand';

export const useMoreTabStore = create((set) => ({
  activeTab: 'restaurant', // 'restaurant' 또는 'accommodation'
  setActiveTab: (tab) => set({ activeTab: tab }),
}));