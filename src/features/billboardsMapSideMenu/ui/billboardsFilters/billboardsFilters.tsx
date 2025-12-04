import s from './billboardsFilters.module.scss';
import { DistrictFilter } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/disctrictFilter/districtFilter';
import { ConstructionTypeFilter } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/constructionTypeFilter/constructionTypeFilter';
import { StatusFilter } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/statusFilter/statusFilter';
import { SizeFilter } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/sizeFilter/sizeFilter';
import { MonthRangeInput, SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import { RangeSlider } from 'src/shared/ui/rangeSlider/rangeSlider';
import { useRef, useState } from 'react';
import { getDateRangeFromSelection } from 'src/features/selectDateRangeModal/utils/getDateRangeFromSelection';
import toast from 'react-hot-toast';
import { useStore } from 'src/shared/store';

export const BillboardsFilters = () => {
    const filters = useStore(store => store.filters);
    const updateFilter = useStore(store => store.updateFilter);
    const resetFilters = useStore(store => store.resetFilters);

    const [ selectedMonth, setSelectedMonth ] = useState<SelectedMonth[]>([]);
    const filterListRef = useRef<HTMLDivElement>(null);

    const handleMonthRangeChange = (months: SelectedMonth[]) => {
        //todo: потом добавить когда появится на бэке
        // updateFilter('monthRange', getDateRangeFromSelection(months));
        setSelectedMonth(months);
    };

    const handlePriceChange = (min: number, max: number) => {
        updateFilter('min_price', min);
        updateFilter('max_price', max);
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
                    value={filters.district}
                    onChangeFilters={filters => updateFilter('district', filters)}
                />
                <ConstructionTypeFilter
                    value={filters.billboard_type}
                    onChangeFilters={filters => updateFilter('billboard_type', filters)}
                />
                <StatusFilter
                    value={filters.billboard_status}
                    onChangeFilters={filters => updateFilter('billboard_status', filters)}
                />
                <SizeFilter
                    value={filters.billboard_size}
                    onChangeFilters={filters => updateFilter('billboard_size', filters)}
                />
                {/*<div*/}
                {/*    className={s['month-filter']}*/}
                {/*>*/}
                {/*    <h5*/}
                {/*        className={s['month-title']}*/}
                {/*    >*/}
                {/*        Месяцы*/}
                {/*    </h5>*/}
                {/*    <MonthRangeInput*/}
                {/*        value={selectedMonth}*/}
                {/*        onMonthsChange={handleMonthRangeChange}*/}
                {/*    />*/}
                {/*</div>*/}
                <RangeSlider
                    min={0}
                    max={100000}
                    step={1000}
                    minValue={0}
                    maxValue={100000}
                    label={'Цена'}
                    suffix={'₽'}
                    value={[ filters.min_price, filters.max_price ]}
                    onChange={handlePriceChange}
                />
            </div>
        </div>
    );
};
