import { Checkbox } from 'src/shared/ui/checkbox/checkbox';
import s from './filterSection.module.scss';
import { useEffect, useState } from 'react';
import CheckedLight from 'src/app/assets/images/svg/checked_light.svg?react';

interface IFilterSectionProps {
    title: string;
    items: string[];
    value: string[];

    onChangeFilters: (filters: string[]) => void;
}

export const FilterSection = (props: IFilterSectionProps) => {
    const { title, items, onChangeFilters, value } = props;

    const [ filters, setFilters ] = useState<string[]>([]);

    useEffect(() => {
        setFilters(value);
    }, [ value ]);

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
                {
                    items.map(item => (
                        <li
                            key={item}
                        >
                            <Checkbox
                                icon={<CheckedLight/>}
                                id={item}
                                className={s['checkbox']}
                                checked={filters.includes(item)}
                                onChange={e => {
                                    const newFilters = e.target.checked
                                        ? [ ...filters, item ]
                                        : filters.filter(filter => filter !== item);

                                    setFilters(newFilters);
                                    onChangeFilters(newFilters);
                                }}
                            >
                                {item}
                            </Checkbox>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
