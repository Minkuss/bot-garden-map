import NiceModal, { useModal } from '@ebay/nice-modal-react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ModalLayout } from 'src/shared/ui/modalLayout/modalLayout';
import { BillboardDetailDto } from 'src/entities/billboard';
import { getModifiedBillboardInfo } from 'src/shared/utils/getModifiedBillboardWithDates';
import { BillboardImage } from 'src/features/detailedBillboardInfoModal/ui/billboardImage/billboardImage';
import toast from 'react-hot-toast';
import { MonthRangeInput, SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import s from './detailedBillboardInfo.module.scss';
import { BillboardInfo } from 'src/features/detailedBillboardInfoModal/ui/billboardInfo/billboardInfo';
import { useBillboardPrice } from 'src/shared/hooks/useBillboardPrice';
import { BillboardPrices } from 'src/features/detailedBillboardInfoModal/ui/billboardPrices/billboardPrices';
import { BillboardButtons } from 'src/features/detailedBillboardInfoModal/ui/billboardButtons/billboardButtons';
import { SkeletonLoader } from 'src/shared/ui/skeletonLoader/skeletonLoader';

export default NiceModal.create(({ billboardId, side }: {billboardId: string, side: string}) => {
    const modalContent = useRef<HTMLDivElement>(null);
    const modal = useModal();
    const [ billboardInfo, setBillboardInfo ] = useState<BillboardDetailDto>();
    const [ billboardSides, setBillboardSides ] = useState<string[]>([]);
    const [ billboardSideIndex, setBillboardSideIndex ] = useState<number>(0);
    const [ selectedMonths, setSelectedMonths ] = useState<SelectedMonth[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    const { totalMonths, totalPrice, totalRentPrice, countTotalCount, countTotalRentPrice, countTotalPrice } =
        useBillboardPrice(billboardInfo, selectedMonths);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            modal.remove();
        }
    };

    const handleCloseModal = () => {
        modal.resolve();
        modal.remove();
    };

    const getBillboard = useCallback(async(sideIndex: number) => {
        try {
            setLoading(true);
            const billboardFetchedSides = [ 'A', 'B' ]; //todo temp: пример (нужен новый хвост)
            setBillboardSides(billboardFetchedSides);

            const billboard = await getModifiedBillboardInfo(billboardId, billboardFetchedSides[sideIndex]);

            setBillboardSideIndex(sideIndex);

            setBillboardInfo(billboard);

            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.detail);
            console.error(error);
        }
    }, [ billboardId ]);

    useEffect(() => {
        getBillboard(0);
    }, [ billboardId, getBillboard, side ]);

    useEffect(() => {
        countTotalCount();

        countTotalRentPrice();

        countTotalPrice();
    }, [ countTotalCount, countTotalPrice, countTotalRentPrice, selectedMonths ]);

    const handleChangeSide = () => {
        getBillboard(billboardSideIndex + 1 !== billboardSides.length ? billboardSideIndex + 1 : 0);
    };

    useGSAP(() => {
        if (!modalContent.current) return;

        if (modal.visible) {
            // Анимация открытия
            gsap.fromTo(
                modalContent.current,
                {
                    scale: 0.8,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                },
            );
        }
    }, {
        dependencies: [ modal.visible ],
        scope: modalContent,
    });

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

    // Не рендерим ничего если модалка была удалена
    if (!modal.visible && !modalContent.current) {
        return null;
    }

    return (
        <ModalLayout
            isVisible={modal.visible}
            onClose={handleOverlayClick}
            modalRef={modalContent}
            contentStyle={{
                maxWidth: '1000px',
            }}
        >
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
                                handleAddToCart={() => {}}
                                handleMakeOrder={() => {}}
                            />
                        </div>
                }
            </div>
        </ModalLayout>
    );
});
