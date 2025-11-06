import NiceModal, { useModal } from '@ebay/nice-modal-react';
import classNames from 'classnames';
import s from './selectDateRangeModal.module.scss';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import { addDays, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Button } from 'src/shared/ui/button/button';

export default NiceModal.create(() => {
    const modal = useModal();
    const [ state, setState ] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
        },
    ]);

    const start = state[0].startDate;
    const end = state[0].endDate;
    const diffInDays = differenceInDays(end, start);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            modal.hide();
        }
    };

    const handleCloseModal = () => {
        modal.resolve(state);
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
                <h1>
                    Выберите дату бронирования
                </h1>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([ item.selection ])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    locale={ru}
                    rangeColors={[ '#35B44A' ]}
                />
                <Button
                    label={
                        diffInDays < 28
                            ? 'Минимальный срок — 1 месяц'
                            : 'Выбрать даты'
                    }
                    variant={'contained'}
                    onClick={handleCloseModal}
                    disabled={diffInDays < 28}
                />
            </div>
        </div>
    );
});
