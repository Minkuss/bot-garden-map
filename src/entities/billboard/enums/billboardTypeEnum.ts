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

export type BillboardTypeEnumType = keyof typeof BillboardTypeEnum;
