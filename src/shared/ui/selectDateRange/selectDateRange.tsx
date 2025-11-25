import { useEffect, useRef, useState } from 'react';
import { MonthRangeInput, SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import { billboardApi, BillboardDetailDto } from 'src/entities/billboard';
import { getDateRangeFromSelection } from 'src/features/selectDateRangeModal/utils/getDateRangeFromSelection';
import plural from 'plural-ru';
import s from './selectDateRange.module.scss';
import { DateRange } from 'src/features/selectDateRangeModal/model/dateRange';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useBillboardPrice } from 'src/shared/hooks/useBillboardPrice';

interface ISelectDateRangeProps {
    billboardId: string;
    side: string;
    onMonthRangeChange: (dates: DateRange | null) => void;
}

export const SelectDateRange = (props: ISelectDateRangeProps) => {
    const { billboardId, side, onMonthRangeChange } = props;

    const [ selectedMonths, setSelectedMonths ] = useState<SelectedMonth[]>([]);
    const [ billboardInfo, setBillboardInfo ] = useState<BillboardDetailDto>();

    const rentPriceRef = useRef<HTMLSpanElement | null>(null);
    const totalPriceRef = useRef<HTMLSpanElement | null>(null);

    const { totalMonths, totalPrice, totalRentPrice, countTotalCount, countTotalRentPrice, countTotalPrice } =
        useBillboardPrice(billboardInfo, selectedMonths);

    useEffect(() => {
        const loadBillboardInfo = async() => {
            try {
                const data = await billboardApi.getBillboardInfo({
                    id: billboardId,
                    side,
                });

                setBillboardInfo(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadBillboardInfo();
    }, [ billboardId, side ]);

    useEffect(() => {
        countTotalCount();

        countTotalRentPrice();

        countTotalPrice();

        const dates = getDateRangeFromSelection(selectedMonths);
        onMonthRangeChange(dates);
    }, [ countTotalCount, countTotalPrice, countTotalRentPrice, onMonthRangeChange, selectedMonths ]);

    useGSAP(() => {
        if (!rentPriceRef.current) return;

        gsap.to(rentPriceRef.current, {
            textContent: totalRentPrice,
            duration: 0.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
        });
    }, [ totalRentPrice ]);

    useGSAP(() => {
        if (!totalPriceRef.current) return;

        gsap.to(totalPriceRef.current, {
            textContent: totalRentPrice === 0 ? 0 : totalPrice,
            duration: 0.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
        });
    }, [ totalPrice, totalRentPrice ]);

    return (
        <>
            <h4
                className={s['title']}
            >
                Месяц(ы) для бронирования:
            </h4>
            <MonthRangeInput
                onMonthsChange={setSelectedMonths}
            />
            <p
                className={s['price-info']}
            >
                <span>
                    Цена баннера за {totalMonths} {plural(totalMonths, 'месяц', 'месяца', 'месяцев')}:
                    {' '}
                    <span ref={rentPriceRef}/> руб
                </span>
                <span>
                    Монтаж / Демонтаж: {billboardInfo?.service_price ?? ''} руб
                </span>
                <span>
                    Изготовление: {billboardInfo?.manufacturing_cost ?? ''} руб
                </span>
                <span className={s['total-price']}>
                    Итого: <span ref={totalPriceRef}/> руб
                </span>
            </p>
        </>
    );
};
