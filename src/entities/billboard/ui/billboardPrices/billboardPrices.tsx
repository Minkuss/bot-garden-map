import s from './billboardPrices.module.scss';
import plural from 'plural-ru';
import { BillboardDetailDto } from 'src/entities/billboard';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { numberCountAnim } from 'src/shared/lib/gsap/animations/numberCountAnim';

interface IBillboardPricesProps {
    billboardInfo?: BillboardDetailDto;
    totalMonths: number;
    totalRentPrice: number;
    totalPrice: number;
}

export const BillboardPrices = (props: IBillboardPricesProps) => {
    const { billboardInfo, totalMonths, totalRentPrice, totalPrice } = props;

    const rentPriceRef = useRef<HTMLSpanElement | null>(null);
    const totalPriceRef = useRef<HTMLSpanElement | null>(null);
    const servicePriceRef = useRef<HTMLSpanElement | null>(null);
    const manufacturingPriceRef = useRef<HTMLSpanElement | null>(null);

    useGSAP(() => {
        if (!rentPriceRef.current) return;

        numberCountAnim(rentPriceRef.current, String(totalRentPrice));
    }, [ totalRentPrice ]);

    useGSAP(() => {
        if (!totalPriceRef.current) return;

        numberCountAnim(totalPriceRef.current, String(totalRentPrice === 0 ? 0 : totalPrice));
    }, [ totalPrice, totalRentPrice ]);

    useGSAP(() => {
        if (!servicePriceRef.current || !manufacturingPriceRef.current) return;

        numberCountAnim(servicePriceRef.current, String(billboardInfo?.service_price ?? ''));
        numberCountAnim(manufacturingPriceRef.current, String(billboardInfo?.manufacturing_cost ?? ''));
    }, [ billboardInfo ]);

    return (
        <div
            className={s['prices']}
        >
            <p>
                <span>
                    Цена баннера за {totalMonths} {plural(totalMonths, 'месяц', 'месяца', 'месяцев')}:
                </span>
                <span>
                    <span ref={rentPriceRef}/>
                    руб
                </span>
            </p>
            <p>
                <span>
                    Монтаж / Демонтаж:
                </span>
                <span>
                    <span ref={servicePriceRef}/>
                    руб
                </span>
            </p>
            <p>
                <span>
                    Изготовление:
                </span>
                <span>
                    <span ref={manufacturingPriceRef}/>
                    руб
                </span>
            </p>
            <p
                className={s['total-price']}
            >
                <span>
                    Итого:
                </span>
                <span>
                    <span ref={totalPriceRef}/>
                    руб
                </span>
            </p>
        </div>
    );
};
