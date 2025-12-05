import { StoreSlice } from 'src/shared/store/types';

export interface MapSlice {
    setZoomCoords: (long: number, lat: number) => void;
    zoomCoords?: {
        long: number,
        lat: number;
    }
}

export const createMapSlice: StoreSlice<MapSlice> = set => ({
    zoomCoords: undefined,

    setZoomCoords: (long, lat) => {
        set({
            zoomCoords: {
                lat,
                long,
            },
        });
    },
});
