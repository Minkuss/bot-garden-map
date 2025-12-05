import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { BillboardButtons, BillboardDetailDto, BillboardImage, BillboardInfo, BillboardPrices } from 'src/entities/billboard';
import { getModifiedBillboardInfo, getModifiedBillboardWithDates } from 'src/shared/utils/getModifiedBillboardWithDates';
import toast from 'react-hot-toast';
import { MonthRangeInput, SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import { useBillboardPrice } from 'src/shared/hooks/useBillboardPrice';
import { SkeletonLoader } from 'src/shared/ui/skeletonLoader/skeletonLoader';
import { BookingCreateParams } from 'src/entities/cart';
import { getDateRangeFromSelection } from 'src/features/selectDateRangeModal/utils/getDateRangeFromSelection';
import { format, parse } from 'date-fns';
import s from './detailedBillboardInfo.module.scss';
import { LeaveOrderInputs } from 'src/entities/order/ui/leaveOrderForm';
import NiceModal from '@ebay/nice-modal-react';
import CartLeaveOrderModal from 'src/features/cartLeaveOrderModal/ui/cartLeaveOrderModal';
import { useStore } from 'src/shared/store';

interface IDetailedBillboardInfoProps {
    billboardId: string;
    side: string;
}

export const DetailedBillboardInfo = (props: IDetailedBillboardInfoProps) => {
    const { billboardId, side } = props;

    const [ billboardInfo, setBillboardInfo ] = useState<BillboardDetailDto>();
    const [ billboardSides, setBillboardSides ] = useState<string[]>([]);
    const [ billboardSideIndex, setBillboardSideIndex ] = useState<number>(0);
    const [ selectedMonths, setSelectedMonths ] = useState<SelectedMonth[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const contentWrapperRef = useRef<HTMLDivElement>(null);
    const add = useStore(store => store.addToCart);
    const cart = useStore(store => store.cart);
    const clearCart = useStore(store => store.clearCart);

    const dates = useMemo(() => getDateRangeFromSelection(selectedMonths), [ selectedMonths ]);

    const { totalMonths, totalPrice, totalRentPrice } =
        useBillboardPrice(billboardInfo, selectedMonths);

    const handleAddToCart = () => {
        if (!dates) {
            toast.error('Пожалуйста, выберите даты.');
            return;
        }

        const start = format(dates.startDate, 'dd.MM.yyyy');
        const end = format(dates.endDate, 'dd.MM.yyyy');

        if (cart.find(it => it.id === billboardId)) {
            toast.error('Товар уже есть в корзине.');
            return;
        }

        add({
            id: billboardId,
            side,
            start,
            end,
        });

        toast.success('Товар добавлен в корзину.');
    };

    const handleMakeOrder = async() => {
        if (!dates) {
            toast.error('Пожалуйста, выберите даты.');
            return;
        }

        const info: LeaveOrderInputs = await NiceModal.show(CartLeaveOrderModal, { billboardId, side, showMonthInput: false });

        const start = format(dates.startDate, 'dd.MM.yyyy');
        const end = format(dates.endDate, 'dd.MM.yyyy');

        const billboard = await getModifiedBillboardWithDates(billboardId, side, start, end);

        const params: BookingCreateParams = {
            billboards: [ {
                billboard_id: billboard.id,
                side: billboard.side,
                start_date: format(parse(billboard.start_date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd'),
                end_date: format(parse(billboard.end_date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd'),
            } ],
            email: info.email,
            first_name: info.firstName,
            last_name: info.lastName,
            middle_name: info.middleName,
            organization: info.organization,
            phone: info.phoneNumber.replace(/[^\d+]/g, ''),
        };

        clearCart(params);
    };

    const getBillboard = useCallback(async(sideIndex: number, changeSide: boolean) => {
        try {
            if (!changeSide) setLoading(true);
            const billboardFetchedSides = [ 'А', 'Б' ]; //todo temp: пример (нужен новый хвост)
            setBillboardSides(billboardFetchedSides);

            const billboard = await getModifiedBillboardInfo(billboardId, billboardFetchedSides[sideIndex]);

            setBillboardSideIndex(sideIndex);

            setBillboardInfo(billboard);

            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.detail);
            console.error(error);
            setLoading(false);
        }
    }, [ billboardId ]);

    useEffect(() => {
        getBillboard(0, false);
    }, [ billboardId, getBillboard, side ]);

    const handleChangeSide = () => {
        getBillboard(billboardSideIndex + 1 !== billboardSides.length ? billboardSideIndex + 1 : 0, true);
    };

    useGSAP(() => {
        if (loading || !contentWrapperRef.current) return;

        const items = gsap.utils.toArray<HTMLElement>('div');

        gsap.fromTo(
            items,
            {
                opacity: 0,
                y: 15,
                filter: 'blur(6px)',
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.2,
                ease: 'power2.out',
                stagger: 0.04,
            },
        );
    }, {
        dependencies: [ loading ],
        scope: contentWrapperRef,
    });

    return (
        <div
            className={s['detailed-wrapper']}
            ref={contentWrapperRef}
        >
            {
                loading
                    ? <SkeletonLoader
                        minHeight={'220px'}
                    />
                    : <BillboardImage
                        billboardInfo={billboardInfo}
                        onChangeSide={handleChangeSide}
                        isLastIndex={billboardSideIndex === billboardSides.length - 1}
                    />
            }
            {
                loading
                    ? <SkeletonLoader/>
                    : <div
                        className={s['month-range-wrapper']}
                    >
                        <h4
                            className={s['title']}
                        >
                            Выберите месяц(ы) для бронирования:
                        </h4>
                        <MonthRangeInput
                            onMonthsChange={setSelectedMonths}
                        />
                    </div>
            }
            {
                loading
                    ? <SkeletonLoader/>
                    : <BillboardInfo
                        billboardInfo={billboardInfo}
                    />
            }
            {
                loading
                    ? <SkeletonLoader/>
                    : <div
                        className={s['prices-buttons-wrapper']}
                    >
                        <BillboardPrices
                            totalMonths={totalMonths}
                            totalRentPrice={totalRentPrice}
                            totalPrice={totalPrice}
                            billboardInfo={billboardInfo}
                        />
                        <BillboardButtons
                            handleAddToCart={handleAddToCart}
                            handleMakeOrder={handleMakeOrder}
                        />
                    </div>
            }
        </div>
    );
};
