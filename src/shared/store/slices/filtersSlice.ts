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
    districts: [],
    constructionTypes: [],
    status: [],
    sizes: [],
    monthRange: null,
    priceRange: [ 0, 100000 ],
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
