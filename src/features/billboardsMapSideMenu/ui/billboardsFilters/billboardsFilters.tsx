import s from './billboardsFilters.module.scss';
import { DistrictFilter } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/disctrictFilter/districtFilter';
import { ConstructionTypeFilter } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/constructionTypeFilter/constructionTypeFilter';
import { StatusFilter } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/statusFilter/statusFilter';
import { SizeFilter } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/sizeFilter/sizeFilter';
import { MonthRangeInput, SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import { RangeSlider } from 'src/shared/ui/rangeSlider/rangeSlider';
import { useMapFilters } from 'src/features/billboardsMapSideMenu/hooks/useMapFilters';
import { useRef, useState } from 'react';
import { getDateRangeFromSelection } from 'src/features/selectDateRangeModal/utils/getDateRangeFromSelection';
import toast from 'react-hot-toast';

export const BillboardsFilters = () => {
    const { filters, updateFilter, resetFilters } = useMapFilters({
        districts: [],
        constructionTypes: [],
        status: [],
        sizes: [],
        monthRange: null,
        priceRange: [ 0, 100000 ],
    });
    const [ selectedMonth, setSelectedMonth ] = useState<SelectedMonth[]>([]);
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

        toast.success('Фильтры сброшены!');
    };

    return (
        <div
            className={s['filters']}
        >
            <button
                className={s['reset-btn']}
                onClick={handleResetFilters}
            >
                Сбросить Х
            </button>
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
        </div>
    );
};
