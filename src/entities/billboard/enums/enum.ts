export type EnumMap = Record<string, { value: string; name: string }>;

export type EnumValue<TEnum extends EnumMap> = TEnum[keyof TEnum]['value'];
export type EnumEntry<TEnum extends EnumMap> = TEnum[keyof TEnum];
