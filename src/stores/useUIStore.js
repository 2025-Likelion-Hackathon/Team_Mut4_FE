import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isBookmarkSidebarOpen: false,
  openBookmarkSidebar: () => set({ isBookmarkSidebarOpen: true }),
  closeBookmarkSidebar: () => set({ isBookmarkSidebarOpen: false }),
}));