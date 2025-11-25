import s from './billboardPrices.module.scss';
import plural from 'plural-ru';
import { BillboardDetailDto } from 'src/entities/billboard';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

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
                    {billboardInfo?.service_price ?? ''} руб
                </span>
            </p>
            <p>
                <span>
                    Изготовление:
                </span>
                <span>
                    {billboardInfo?.manufacturing_cost ?? ''} руб
                </span>
            </p>
            <p>
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
