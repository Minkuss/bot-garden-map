import s from './billboardsMapFilters.module.scss';
import classNames from 'classnames';
import { RangeSlider } from 'src/shared/ui/rangeSlider/rangeSlider';
import { DistrictFilter } from 'src/features/billboardsMapFilters/ui/disctrictFilter/districtFilter';
import { ConstructionTypeFilter } from 'src/features/billboardsMapFilters/ui/constructionTypeFilter/constructionTypeFilter';
import { StatusFilter } from 'src/features/billboardsMapFilters/ui/statusFilter/statusFilter';
import { SizeFilter } from 'src/features/billboardsMapFilters/ui/sizeFilter/sizeFilter';
import { MonthRangeInput, SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import { useMapFilters } from 'src/features/billboardsMapFilters/hooks/useMapFilters';
import { getDateRangeFromSelection } from 'src/features/selectDateRangeModal/utils/getDateRangeFromSelection';
import { useState } from 'react';
import { Button } from 'src/shared/ui/button/button';

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

    return (
        <div
            className={classNames(
                s['filters'],
                show && s['filters--show'],
            )}
        >
            <h4
                className={s['title']}
            >
                Фильтры
            </h4>
            <div
                className={s['filters-list']}
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
