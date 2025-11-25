import { BillboardDetailDto } from 'src/entities/billboard';
import { SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import { useState } from 'react';

export function useBillboardPrice(billboardInfo?: BillboardDetailDto, selectedMonths?: SelectedMonth[]) {
    const [ totalMonths, setTotalMonths ] = useState<number>(0);
    const [ totalPrice, setTotalPrice ] = useState<number>(0);
    const [ totalRentPrice, setTotalRentPrice ] = useState<number>(0);

    if (!billboardInfo || !selectedMonths) {
        return {
            totalMonths,
            totalPrice,
            totalRentPrice,
            countTotalCount: () => {},
            countTotalRentPrice: () => {},
            countTotalPrice: () => {},
        };
    }

    const countTotalCount = () => {
        let totalMonths = 0;

        selectedMonths.forEach(month => {
            totalMonths += month.monthIndexes.length;
        });

        setTotalMonths(totalMonths);
    };

    const countTotalRentPrice = () => {
        if (!billboardInfo) {
            return;
        }

        const totalRentPrice = billboardInfo?.rent_price * totalMonths;

        setTotalRentPrice(totalRentPrice);
    };

    const countTotalPrice = () => {
        if (!billboardInfo) {
            return;
        }

        const totalPrice = totalRentPrice + billboardInfo?.service_price + billboardInfo?.manufacturing_cost;

        setTotalPrice(totalPrice);
    };

    return {
        totalMonths,
        totalPrice,
        totalRentPrice,
        countTotalCount,
        countTotalRentPrice,
        countTotalPrice,
    };
}
