import { DateRange } from 'src/features/selectDateRangeModal/model/dateRange';

export interface MapFilterValues {
    districts: string[];
    constructionTypes: string[];
    status: string[];
    sizes: string[];
    monthRange: DateRange | null;
    priceRange: [number, number];
}
