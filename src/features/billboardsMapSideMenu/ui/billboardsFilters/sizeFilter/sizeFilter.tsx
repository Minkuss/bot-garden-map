import { FilterSection } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/filterSection/filterSection';
import { useCallback } from 'react';
import { FilterProps } from 'src/features/billboardsMapSideMenu/models/filterProps';

export const SizeFilter = (props: FilterProps) => {
    const { onChangeFilters, value } = props;

    const handleChangeFilters = useCallback((filters: string[]) => {
        onChangeFilters(filters);
    }, [ onChangeFilters ]);

    return (
        <FilterSection
            value={value}
            title={'Размер конструкции'}
            items={
                [
                    '3,7х2,7',
                    '2х4',
                    '6х3',
                    '1,4х2,73',
                    '1,45х2,95',
                    '1,4х3,05',
                    '1,2х1,8',
                    '2,1х0,9',
                ]
            }
            onChangeFilters={handleChangeFilters}
        />
    );
};
