import { StateCreator } from 'zustand';
import { AuthSlice } from 'src/shared/store/slices/authSlice';
import { CartSlice } from 'src/shared/store/slices/cartSlice';
import { FiltersSlice } from 'src/shared/store/slices/filtersSlice';
import { MapSlice } from 'src/shared/store/slices/mapSlice';

export type StoreSlice<T> = StateCreator<
    StoreState,
    [['zustand/persist', unknown]],
    [],
    T
>;

export type StoreState = AuthSlice & CartSlice & FiltersSlice & MapSlice;
