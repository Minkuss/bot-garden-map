import { BillboardMarkerDto } from 'src/entities/billboard';

export interface BillboardsMap {
    count: number;
    coordinates: BillboardMarkerDto[];
    bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    }
}
