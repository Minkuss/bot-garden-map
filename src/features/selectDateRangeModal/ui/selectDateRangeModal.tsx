import NiceModal, { useModal } from '@ebay/nice-modal-react';
import classNames from 'classnames';
import s from './selectDateRangeModal.module.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import { Button } from 'src/shared/ui/button/button';
import { SelectDateRange } from 'src/shared/ui/selectDateRange/selectDateRange';
import { DateRange } from 'src/features/selectDateRangeModal/model/dateRange';

export default NiceModal.create(({ billboardId, side }: {billboardId: string, side: string}) => {
    const modal = useModal();
    const [ dates, setDates ] = useState<DateRange | null>(null);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            modal.hide();
        }
    };

    const handleCloseModal = () => {
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
