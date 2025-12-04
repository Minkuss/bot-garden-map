import { BillboardTypeEnumType } from 'src/entities/billboard/enums/billboardTypeEnum';
import { BillboardStatusEnumType } from 'src/entities/billboard/enums/billboardStatusEnum';

export interface BillboardDetailDto {
    id: string;
    address: string;
    city: string;
    city_district: string;
    longitude: number;
    latitude: number;
    size: string;
    side: string | null;
    lighting: boolean;
    type: BillboardTypeEnumType;
    status: BillboardStatusEnumType | null;
    rent_price: number;
    service_price: number;
    manufacturing_cost: number;
    photo_url: string | null;
}
