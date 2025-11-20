import { useCallback, useState } from 'react';
import { MapFilterValues } from 'src/features/billboardsMapFilters/models/mapFilterValues';

export const useMapFilters = (initialValues?: Partial<MapFilterValues>) => {
    const [ filters, setFilters ] = useState<MapFilterValues>({
        districts: initialValues?.districts || [],
        constructionTypes: initialValues?.constructionTypes || [],
        status: initialValues?.status || [],
        sizes: initialValues?.sizes || [],
        monthRange: initialValues?.monthRange || null,
        priceRange: initialValues?.priceRange || [ 0, 100000 ],
    });

    const updateFilter = useCallback(<K extends keyof MapFilterValues>(
        key: K,
        value: MapFilterValues[K],
    ) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(initialValues as MapFilterValues);
    }, [ initialValues ]);

    return {
        filters,
        updateFilter,
        resetFilters,
        setFilters,
    };
};
