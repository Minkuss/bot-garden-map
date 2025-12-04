import { BillboardDistrictValue } from 'src/entities/billboard/enums/billboardDistrictEnum';
import { BillboardStatusEnumType } from 'src/entities/billboard/enums/billboardStatusEnum';
import { BillboardTypeEnumType } from 'src/entities/billboard/enums/billboardTypeEnum';
import { BillboardSizeEnumType } from 'src/entities/billboard/enums/billboardSizeEnum';
import { DateRange } from 'src/features/selectDateRangeModal/model/dateRange';

export interface MapFilterValues {
    district: BillboardDistrictValue[];
    billboard_type: BillboardTypeEnumType[];
    billboard_status: BillboardStatusEnumType[];
    billboard_size: BillboardSizeEnumType[];
    // monthRange: DateRange | null;
    min_price: number;
    max_price: number;
}
