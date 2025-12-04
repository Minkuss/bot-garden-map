import { StoreSlice } from '../types';
import { MapFilterValues } from 'src/features/billboardsMapSideMenu/models/mapFilterValues';

export interface FiltersSlice {
    filters: MapFilterValues;
    updateFilter: <K extends keyof MapFilterValues>(
        key: K,
        value: MapFilterValues[K]
    ) => void;
    resetFilters: () => void;
    setFilters: (filters: MapFilterValues) => void;
}

const defaultFilters: MapFilterValues = {
    district: [],
    billboard_type: [],
    billboard_status: [],
    billboard_size: [],
    // monthRange: null,
    min_price: 0,
    max_price: 100000,
};

export const createFiltersSlice: StoreSlice<FiltersSlice> = set => ({
    filters: defaultFilters,

    updateFilter: (key, value) => {
        set(state => ({
            filters: {
                ...state.filters,
                [key]: value,
            },
        }));
    },

    resetFilters: () => {
        set({ filters: defaultFilters });
    },

    setFilters: filters => {
        set({ filters });
    },
});
