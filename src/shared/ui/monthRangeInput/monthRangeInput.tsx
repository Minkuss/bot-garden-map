import s from './monthRangeInput.module.scss';
import YearPicker from 'src/shared/ui/yearPicker/yearPicker';
import { Button } from 'src/shared/ui/button/button';
import { useEffect, useState } from 'react';

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export interface SelectedMonth {
    monthIndexes: number[];
    year: number;
}

interface IMonthRangeInputProps {
    onMonthsChange: (months: SelectedMonth[]) => void;
}

export const MonthRangeInput = (props: IMonthRangeInputProps) => {
    const { onMonthsChange } = props;

    const [ selectedMonthIndexes, setSelectedMonthIndexes ] = useState<SelectedMonth[]>([]);
    const [ selectedYear, setSelectedYear ] = useState<number>(new Date().getFullYear());
    const [ disabledMonthsIndexes, setDisabledMonthsIndexes ] = useState<SelectedMonth[]>([]);

    useEffect(() => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const disabledMonths: number[] = [];

        for (let i = 0; i < currentMonth; i++) {
            disabledMonths.push(i);
        }

        setDisabledMonthsIndexes([
            {
                monthIndexes: [ ...disabledMonths ],
                year: currentYear,
            },
        ]);
    }, []);

    const isMonthSelected = (monthIndex: number) =>
        selectedMonthIndexes.find(i => i.year === selectedYear)?.monthIndexes.includes(monthIndex);

    const isMonthDisabled = (monthIndex: number) =>
        disabledMonthsIndexes.find(i => i.year === selectedYear)?.monthIndexes.includes(monthIndex);

    const handleMonthSelect = (index: number) => {
        setSelectedMonthIndexes(prev => {
            const existingYearIndex = prev.findIndex(i => i.year === selectedYear);

            let newSelection: SelectedMonth[];

            if (existingYearIndex !== -1) {
                const existingYear = prev[existingYearIndex];
                const monthExists = existingYear.monthIndexes.includes(index);

                newSelection = prev.map((item, idx) => {
                    if (idx === existingYearIndex) {
                        return {
                            ...item,
                            monthIndexes: monthExists
                                ? item.monthIndexes.filter(i => i !== index)
                                : [ ...item.monthIndexes, index ],
                        };
                    }
                    return item;
                })
                    .filter(i => i.monthIndexes.length !== 0);
            } else {
                newSelection = [
                    ...prev,
                    {
                        monthIndexes: [ index ],
                        year: selectedYear,
                    },
                ];
            }

            onMonthsChange(newSelection);

            return newSelection;
        });
    };

    return (
        <div className={s['input-wrapper']}>
            <YearPicker
                onYearChange={year => setSelectedYear(year)}
            />
            <div className={s['months']}>
                {months.map((month, index) => (
                    <Button
                        key={month}
                        label={month}
                        variant={isMonthSelected(index) ? 'contained' : 'outlined'}
                        disabled={isMonthDisabled(index)}
                        onClick={e => {
                            e.preventDefault();
                            handleMonthSelect(index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

