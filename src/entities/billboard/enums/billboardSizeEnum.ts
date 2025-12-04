import { EnumValue } from 'src/entities/billboard/enums/enum';

export const BillboardSizeEnum = {
    '6x3': {
        value: '6x3',
        name: '6x3',
    },
    '4850x9850': {
        value: '4850x9850',
        name: '4850x9850',
    },
    '3.7x2.7': {
        value: '3.7x2.7',
        name: '3.7x2.7',
    },
    '2x4': {
        value: '2x4',
        name: '2x4',
    },
    '2.1x0.9': {
        value: '2.1x0.9',
        name: '2.1x0.9',
    },
    '1.4x3.05': {
        value: '1.4x3.05',
        name: '1.4x3.05',
    },
    '1.4x2.73': {
        value: '1.4x2.73',
        name: '1.4x2.73',
    },
    '1.45x2.95': {
        value: '1.45x2.95',
        name: '1.45x2.95',
    },
    '1.2x1.8': {
        value: '1.2x1.8',
        name: '1.2x1.8',
    },
} as const;

export type BillboardSizeEnumType = EnumValue<typeof BillboardSizeEnum>;
