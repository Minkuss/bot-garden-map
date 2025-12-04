import { FilterSection } from 'src/features/billboardsMapSideMenu/ui/billboardsFilters/filterSection/filterSection';
import { useCallback } from 'react';
import { FilterProps } from 'src/features/billboardsMapSideMenu/models/filterProps';
import { BillboardSizeEnum, BillboardSizeEnumType } from 'src/entities/billboard/enums/billboardSizeEnum';

export const SizeFilter = (props: FilterProps<BillboardSizeEnumType>) => {
    const { onChangeFilters, value } = props;

    const handleChangeFilters = useCallback(
        (filters: BillboardSizeEnumType[]) => {
            onChangeFilters(filters);
        },
        [ onChangeFilters ],
    );

    return (
        <FilterSection
            title={'Размер конструкции'}
            enumMap={BillboardSizeEnum}
            value={value}
            onChangeFilters={handleChangeFilters}
        />
    );
};
