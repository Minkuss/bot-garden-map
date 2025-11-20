import { FilterSection } from 'src/features/billboardsMapFilters/ui/filterSection/filterSection';
import { useCallback } from 'react';
import { FilterProps } from 'src/features/billboardsMapFilters/models/filterProps';

export const ConstructionTypeFilter = (props: FilterProps) => {
    const { onChangeFilters, value } = props;

    const handleChangeFilters = useCallback((filters: string[]) => {
        onChangeFilters(filters);
    }, [ onChangeFilters ]);

    return (
        <FilterSection
            value={value}
            title={'Тип строения'}
            items={
                [
                    'Баннер',
                    'Призма',
                    'Скролл',
                ]
            }
            onChangeFilters={handleChangeFilters}
        />
    );
};
