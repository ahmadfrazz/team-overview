import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OverviewState {
  userOrder: string[];
  setUserOrder: (ids: string[]) => void;
}

export const use_overview_store = create(
  persist<OverviewState>(
    (set) => ({
      userOrder: [],
      setUserOrder: (ids) => set({ userOrder: ids }),
    }),
    { name: 'overview_store' }
  )
);
