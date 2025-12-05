import { BillboardTypeEnumType } from 'src/entities/billboard/enums/billboardTypeEnum';

export interface BillboardMarkerDto {
    id: string;
    longitude: number;
    latitude: number;
    address: string;
    available: boolean;
    photo_url: string | null;
    size: string;
    rent_price: number;
    type: BillboardTypeEnumType;
}
