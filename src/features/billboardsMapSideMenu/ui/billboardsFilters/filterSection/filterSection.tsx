import { Checkbox } from 'src/shared/ui/checkbox/checkbox';
import s from './filterSection.module.scss';
import { useEffect, useState } from 'react';
import CheckedLight from 'src/app/assets/images/svg/checked_light.svg?react';
import { EnumEntry, EnumMap, EnumValue } from 'src/entities/billboard/enums/enum';

interface FilterSectionProps<TEnum extends EnumMap> {
    title: string;
    enumMap: TEnum;
    value: EnumValue<TEnum>[];
    onChangeFilters: (filters: EnumValue<TEnum>[]) => void;
}

export const FilterSection = <TEnum extends EnumMap>(
    props: FilterSectionProps<TEnum>,
) => {
    const { title, enumMap, onChangeFilters, value } = props;

    const [ filters, setFilters ] = useState<EnumValue<TEnum>[]>([]);

    useEffect(() => {
        setFilters(value);
    }, [ value ]);

    const options = Object.values(enumMap) as EnumEntry<TEnum>[];

    return (
        <div
            id={'type'}
            className={s['type']}
        >
            <h5
                className={s['type--title']}
            >
                {title}
            </h5>
            <ul
                className={s['list']}
            >
                {options.map(opt => (
                    <li
                        key={opt.value}
                    >
                        <Checkbox
                            icon={<CheckedLight />}
                            id={String(opt.value)}
                            className={s['checkbox']}
                            checked={filters.includes(opt.value)}
                            onChange={e => {
                                const newFilters = e.target.checked
                                    ? [ ...filters, opt.value ]
                                    : filters.filter(filter => filter !== opt.value);

                                setFilters(newFilters);
                                onChangeFilters(newFilters);
                            }}
                        >
                            {opt.name}
                        </Checkbox>
                    </li>
                ))}
            </ul>
        </div>
    );
};
