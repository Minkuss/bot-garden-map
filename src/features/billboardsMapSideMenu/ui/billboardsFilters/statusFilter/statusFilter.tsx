import { FilterSection } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/filterSection/filterSection';
import { useCallback } from 'react';
import { FilterProps } from 'src/features/billboardsMapSideMenu/models/filterProps';
import { BillboardStatusEnum, BillboardStatusEnumType } from 'src/entities/billboard/enums/billboardStatusEnum';

export const StatusFilter = (props: FilterProps<BillboardStatusEnumType>) => {
    const { onChangeFilters, value } = props;

    const handleChangeFilters = useCallback(
        (filters: BillboardStatusEnumType[]) => {
            onChangeFilters(filters);
        },
        [ onChangeFilters ],
    );

    return (
        <FilterSection
            title={'Статус'}
            enumMap={BillboardStatusEnum}
            value={value}
            onChangeFilters={handleChangeFilters}
        />
    );
};
