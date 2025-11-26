import { useMemo } from 'react';
import { BillboardDetailDto } from 'src/entities/billboard';
import { SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';

export function useBillboardPrice(
    billboardInfo?: BillboardDetailDto,
    selectedMonths: SelectedMonth[] = [],
) {
    const totalMonths = useMemo(() => {
        if (!selectedMonths?.length) return 0;

        return selectedMonths.reduce(
            (acc, month) => acc + month.monthIndexes.length,
            0,
        );
    }, [ selectedMonths ]);

    const totalRentPrice = useMemo(() => {
        if (!billboardInfo) return 0;
        return billboardInfo.rent_price * totalMonths;
    }, [ billboardInfo, totalMonths ]);

    const totalPrice = useMemo(() => {
        if (!billboardInfo) return 0;
        return (
            totalRentPrice +
            (billboardInfo.service_price ?? 0) +
            (billboardInfo.manufacturing_cost ?? 0)
        );
    }, [ billboardInfo, totalRentPrice ]);

    return {
        totalMonths,
        totalPrice,
        totalRentPrice,
    };
}
