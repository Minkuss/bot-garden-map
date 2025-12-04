import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice';
import { createCartSlice } from './slices/cartSlice';
import { createFiltersSlice } from './slices/filtersSlice';
import { StoreState } from './types';
import { createMapSlice } from 'src/shared/store/slices/mapSlice';

export const useStore = create<StoreState>()(
    persist(
        (...a) => ({
            ...createAuthSlice(...a),
            ...createCartSlice(...a),
            ...createFiltersSlice(...a),
            ...createMapSlice(...a),
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: state => ({
                user: state.user,
                cart: state.cart,
                filters: state.filters,
            }),
        },
    ),
);
