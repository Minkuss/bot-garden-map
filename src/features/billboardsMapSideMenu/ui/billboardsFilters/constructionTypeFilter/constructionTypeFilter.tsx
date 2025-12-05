import { FilterSection } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/filterSection/filterSection';
import { useCallback } from 'react';
import { FilterProps } from 'src/features/billboardsMapSideMenu/models/filterProps';
import { BillboardTypeEnum, BillboardTypeEnumType } from 'src/entities/billboard/enums/billboardTypeEnum';

export const ConstructionTypeFilter = (props: FilterProps<BillboardTypeEnumType>) => {
    const { onChangeFilters, value } = props;

    const handleChangeFilters = useCallback(
        (filters: BillboardTypeEnumType[]) => {
            onChangeFilters(filters);
        },
        [ onChangeFilters ],
    );

    return (
        <FilterSection
            title={'Тип строения'}
            enumMap={BillboardTypeEnum}
            value={value}
            onChangeFilters={handleChangeFilters}
        />
    );
};
