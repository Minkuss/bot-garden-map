import { FilterSection } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/filterSection/filterSection';
import { useCallback } from 'react';
import { FilterProps } from 'src/features/billboardsMapSideMenu/models/filterProps';
import { BillboardDistrictEnum, BillboardDistrictValue } from 'src/entities/billboard/enums/billboardDistrictEnum';

export const DistrictFilter = (props: FilterProps<BillboardDistrictValue>) => {
    const { onChangeFilters, value } = props;

    const handleChangeFilters = useCallback(
        (filters: BillboardDistrictValue[]) => {
            onChangeFilters(filters);
        },
        [ onChangeFilters ],
    );

    return (
        <FilterSection
            title={'Район'}
            enumMap={BillboardDistrictEnum}
            value={value}
            onChangeFilters={handleChangeFilters}
        />
    );
};
