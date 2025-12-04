import { EnumValue } from 'src/entities/billboard/enums/enum';

export const BillboardDistrictEnum = {
    tsentralny: {
        value: 'tsentralny',
        name: 'Центральный',
    },
    kirovsky: {
        value: 'kirovsky',
        name: 'Кировский',
    },
    zheleznodorozhny: {
        value: 'zheleznodorozhny',
        name: 'Железнодорожный',
    },
    industrialny: {
        value: 'industrialny',
        name: 'Индустриальный',
    },
    krasnoflotsky: {
        value: 'krasnoflotsky',
        name: 'Краснофлотский',
    },
} as const;

export type BillboardDistrictValue = EnumValue<typeof BillboardDistrictEnum>;
