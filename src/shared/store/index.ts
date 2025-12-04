import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice';
import { createCartSlice } from './slices/cartSlice';
import { createFiltersSlice } from './slices/filtersSlice';
import { StoreState } from './types';

export const useStore = create<StoreState>()(
    persist(
        (...a) => ({
            ...createAuthSlice(...a),
            ...createCartSlice(...a),
            ...createFiltersSlice(...a),
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
