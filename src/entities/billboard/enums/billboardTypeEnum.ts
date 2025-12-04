import { EnumValue } from 'src/entities/billboard/enums/enum';

export const BillboardTypeEnum = {
    banner: {
        value: 'banner',
        name: 'Статичный баннер',
    },
    prism: {
        value: 'prism',
        name: 'Призма',
    },
    scroll: {
        value: 'scroll',
        name: 'Скролл',
    },
} as const;

export type BillboardTypeEnumType = EnumValue<typeof BillboardTypeEnum>;
