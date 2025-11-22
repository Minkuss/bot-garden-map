import NiceModal, { useModal } from '@ebay/nice-modal-react';
import classNames from 'classnames';
import s from './selectDateRangeModal.module.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRef, useState } from 'react';
import { Button } from 'src/shared/ui/button/button';
import { SelectDateRange } from 'src/shared/ui/selectDateRange/selectDateRange';
import { DateRange } from 'src/features/selectDateRangeModal/model/dateRange';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default NiceModal.create(({ billboardId, side }: {billboardId: string, side: string}) => {
    const modalContent = useRef<HTMLDivElement>(null);
    const modal = useModal();
    const [ dates, setDates ] = useState<DateRange | null>(null);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            modal.remove();
        }
    };

    const handleCloseModal = () => {
        modal.resolve(dates);
        modal.remove();
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

    // Не рендерим ничего если модалка была удалена
    if (!modal.visible && !modalContent.current) {
        return null;
    }

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
                ref={modalContent}
            >
                <SelectDateRange
                    billboardId={billboardId}
                    side={side}
                    onMonthRangeChange={setDates}
                />
                <Button
                    label={'Выбрать даты'}
                    variant={'contained'}
                    onClick={handleCloseModal}
                    disabled={!dates}
                />
            </div>
        </div>
    );
});
