import { BillboardTypeEnumType } from 'src/entities/billboard/enums/billboardTypeEnum';
import { BillboardStatusEnumType } from 'src/entities/billboard/enums/billboardStatusEnum';

export interface BillboardDetailDto {
    id: string;
    address: string;
    city: string;
    longitude: number;
    latitude: number;
    width: number;
    height: number;
    side: string;
    lighting: boolean;
    type: BillboardTypeEnumType;
    status: BillboardStatusEnumType;
    rent_price: number;
    service_price: number;
    manufacturing_cost: number;
    image_url: string;
}
