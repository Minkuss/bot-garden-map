import { FilterSection } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/filterSection/filterSection';
import { useCallback } from 'react';
import { FilterProps } from 'src/features/billboardsMapSideMenu/models/filterProps';

export const StatusFilter = (props: FilterProps) => {
    const { onChangeFilters, value } = props;

    const handleChangeFilters = useCallback((filters: string[]) => {
        onChangeFilters(filters);
    }, [ onChangeFilters ]);

    return (
        <FilterSection
            value={value}
            title={'Статус'}
            items={
                [
                    'Свободно',
                    'Занято',
                    'Зарезервировано',
                    'На ремонте',
                ]
            }
            onChangeFilters={handleChangeFilters}
        />
    );
};
