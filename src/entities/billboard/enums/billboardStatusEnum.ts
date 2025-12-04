import { EnumValue } from 'src/entities/billboard/enums/enum';

export const BillboardStatusEnum = {
    occupied: {
        value: 'occupied',
        name: 'Занято',
    },
    available: {
        value: 'available',
        name: 'Свободно',
    },
    reserved: {
        value: 'reserved',
        name: 'Забронировано',
    },
    maintenance: {
        value: 'maintenance',
        name: 'На обслуживании',
    },
} as const;

export type BillboardStatusEnumType = EnumValue<typeof BillboardStatusEnum>;
