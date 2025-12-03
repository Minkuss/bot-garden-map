import { BillboardTypeEnumType } from 'src/entities/billboard/enums/billboardTypeEnum';
import { BillboardStatusEnumType } from 'src/entities/billboard/enums/billboardStatusEnum';

export interface BillboardMarkerDto {
    id: string;
    longitude: number;
    latitude: number;
    type: BillboardTypeEnumType;
    status: BillboardStatusEnumType;
}
