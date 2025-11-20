import gsap from 'gsap';
import s from './billboardsMapFilters.module.scss';
import { RangeSlider } from 'src/shared/ui/rangeSlider/rangeSlider';
import { DistrictFilter } from 'src/features/billboardsMapFilters/ui/disctrictFilter/districtFilter';
import { ConstructionTypeFilter } from 'src/features/billboardsMapFilters/ui/constructionTypeFilter/constructionTypeFilter';
import { StatusFilter } from 'src/features/billboardsMapFilters/ui/statusFilter/statusFilter';
import { SizeFilter } from 'src/features/billboardsMapFilters/ui/sizeFilter/sizeFilter';
import { MonthRangeInput, SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import { useMapFilters } from 'src/features/billboardsMapFilters/hooks/useMapFilters';
import { getDateRangeFromSelection } from 'src/features/selectDateRangeModal/utils/getDateRangeFromSelection';
import { useRef, useState } from 'react';
import { Button } from 'src/shared/ui/button/button';
import { useGSAP } from '@gsap/react';

interface IBillboardsMapFiltersProps {
    show: boolean;
}

export const BillboardsMapFilters = (props: IBillboardsMapFiltersProps) => {
    const { show } = props;
    const { filters, updateFilter, resetFilters } = useMapFilters({
        districts: [],
        constructionTypes: [],
        status: [],
        sizes: [],
        monthRange: null,
        priceRange: [ 0, 100000 ],
    });
    const [ selectedMonth, setSelectedMonth ] = useState<SelectedMonth[]>([]);
    const filterRef = useRef<HTMLDivElement>(null);
    const filterListRef = useRef<HTMLDivElement>(null);

    const handleMonthRangeChange = (months: SelectedMonth[]) => {
        updateFilter('monthRange', getDateRangeFromSelection(months));
        setSelectedMonth(months);
    };

    const handlePriceChange = (min: number, max: number) => {
        updateFilter('priceRange', [ min, max ]);
    };

    const handleResetFilters = () => {
        resetFilters();
        setSelectedMonth([]);
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
        });

        if (show) {
            const q = gsap.utils.selector(filterListRef);
            tl.to(filterRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.3,
            }, 0)
            .fromTo(q('#type'), {
                opacity: 0,
                x: -20,
            }, {
                opacity: 1,
                x: 0,
                stagger: 0.05,
                duration: 1,
            }, 0.1);
        } else {
            const q = gsap.utils.selector(filterListRef);

            tl.fromTo(filterRef.current, {
                x: 0,
                opacity: 1,
            }, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
            }, 0)
            .fromTo(q('#type'), {
                opacity: 1,
                x: 0,
                stagger: 0.05,
                duration: 1,
            }, {
                opacity: 0,
                x: -20,
            }, 0.1);
        }
    }, {
        dependencies: [ show ],
    });

    return (
        <div
            className={s['filters']}
            ref={filterRef}
        >
            <h4
                className={s['title']}
            >
                Фильтры
            </h4>
            <div
                className={s['filters-list']}
                ref={filterListRef}
            >
                <DistrictFilter
                    value={filters.districts}
                    onChangeFilters={filters => updateFilter('districts', filters)}
                />
                <ConstructionTypeFilter
                    value={filters.constructionTypes}
                    onChangeFilters={filters => updateFilter('constructionTypes', filters)}
                />
                <StatusFilter
                    value={filters.status}
                    onChangeFilters={filters => updateFilter('status', filters)}
                />
                <SizeFilter
                    value={filters.sizes}
                    onChangeFilters={filters => updateFilter('sizes', filters)}
                />
                <div
                    className={s['month-filter']}
                >
                    <h5
                        className={s['month-title']}
                    >
                        Месяцы
                    </h5>
                    <MonthRangeInput
                        value={selectedMonth}
                        onMonthsChange={handleMonthRangeChange}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={100000}
                    step={1000}
                    minValue={0}
                    maxValue={100000}
                    label={'Цена'}
                    suffix={'₽'}
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                />
            </div>
            <div
                className={s['btn-group']}
            >
                <Button
                    label={'Сбросить'}
                    variant={'outlined'}
                    onClick={handleResetFilters}
                />
                <Button
                    label={'Применить'}
                    variant={'contained'}
                    onClick={() => {}}
                />
            </div>
        </div>
    );
};
