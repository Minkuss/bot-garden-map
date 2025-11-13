import NiceModal, { useModal } from '@ebay/nice-modal-react';
import classNames from 'classnames';
import s from './selectDateRangeModal.module.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'src/shared/ui/button/button';
import { MonthRangeInput, SelectedMonth } from 'src/shared/ui/monthRangeInput/monthRangeInput';
import { getDateRangeFromSelection } from 'src/features/selectDateRangeModal/utils/getDateRangeFromSelection';
import { billboardApi, BillboardDetailDto } from 'src/entities/billboard';
import plural from 'plural-ru';

export default NiceModal.create(({ billboardId }: {billboardId: string}) => {
    const modal = useModal();
    const [ selectedMonths, setSelectedMonths ] = useState<SelectedMonth[]>([]);
    const [ totalMonths, setTotalMonths ] = useState<number>(0);
    const [ billboardInfo, setBillboardInfo ] = useState<BillboardDetailDto>();

    const [ totalPrice, setTotalPrice ] = useState<number>(0);
    const [ totalRentPrice, setTotalRentPrice ] = useState<number>(0);

    useEffect(() => {
        const loadBillboardInfo = async() => {
            try {
                const data = await billboardApi.getBillboardInfo({
                    id: billboardId,
                    //todo: это для теста, потом добавить выбор стороны
                    side: 'A',
                });

                setBillboardInfo(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadBillboardInfo();
    }, [ billboardId ]);

    const countTotalCount = useCallback(() => {
        let totalMonths = 0;

        selectedMonths.forEach(month => {
            totalMonths += month.monthIndexes.length;
        });

        setTotalMonths(totalMonths);
    }, [ selectedMonths ]);

    const countTotalRentPrice = useCallback(() => {
        if (!billboardInfo) {
            return;
        }

        const totalRentPrice = billboardInfo?.rent_price * totalMonths;

        setTotalRentPrice(totalRentPrice);
    }, [ billboardInfo, totalMonths ]);

    const countTotalPrice = useCallback(() => {
        if (!billboardInfo) {
            return;
        }

        const totalPrice = totalRentPrice + billboardInfo?.service_price + billboardInfo?.manufacturing_cost;

        setTotalPrice(totalPrice);
    }, [ billboardInfo, totalRentPrice ]);

    useEffect(() => {
        countTotalCount();

        countTotalRentPrice();

        countTotalPrice();
    }, [ countTotalCount, countTotalPrice, countTotalRentPrice, selectedMonths ]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            modal.hide();
        }
    };

    const handleCloseModal = () => {
        const dates = getDateRangeFromSelection(selectedMonths);

        modal.resolve(dates);
        modal.remove();
    };

    return (
        <div
            className={classNames(
                s['overlay'],
                modal.visible && s['overlay__visible'],
            )}
            onClick={handleOverlayClick}
        >
            <div
                className={s['content']}
            >
                <h4>
                    Месяц(ы) для бронирования:
                </h4>
                <MonthRangeInput
                    onMonthsChange={setSelectedMonths}
                />
                <p
                    className={s['price-info']}
                >
                    <span>
                        {`Цена баннера за ${totalMonths} ${plural(totalMonths, 'месяц', 'месяца', 'месяцев')}: ${totalRentPrice} руб`}
                    </span>
                    <span>
                        {`Монтаж / Демонтаж: ${billboardInfo?.service_price} руб`}
                    </span>
                    <span>
                        {`Изготовление: ${billboardInfo?.manufacturing_cost} руб`}
                    </span>
                    <span
                        className={s['total-price']}
                    >
                        {`Итого: ${totalRentPrice === 0 ? 0 : totalPrice}`}
                    </span>
                </p>
                <Button
                    label={'Выбрать даты'}
                    variant={'contained'}
                    onClick={handleCloseModal}
                    disabled={selectedMonths.length === 0}
                />
            </div>
        </div>
    );
});
