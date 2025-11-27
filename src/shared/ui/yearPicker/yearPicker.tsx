import React, { useState } from 'react';
import styles from './yearPicker.module.scss';

interface YearPickerProps {
    initialYear?: number;
    onYearChange?: (year: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({
   initialYear = new Date().getFullYear(),
   onYearChange,
}) => {
    const [ year, setYear ] = useState(initialYear);

    const handlePrevYear = e => {
        e.preventDefault();

        const newYear = year - 1;
        if (newYear < initialYear) {
            return;
        }
        setYear(newYear);
        onYearChange?.(newYear);
    };

    const handleNextYear = e => {
        e.preventDefault();

        const newYear = year + 1;
        setYear(newYear);
        onYearChange?.(newYear);
    };

    return (
        <div className={styles.yearPicker}>
            <button
                className={styles.arrow}
                onClick={handlePrevYear}
                aria-label='Previous year'
                disabled={year === initialYear}
            >
                ‹
            </button>
            <span className={styles.year}>{year}</span>
            <button
                className={styles.arrow}
                onClick={handleNextYear}
                aria-label='Next year'
            >
                ›
            </button>
        </div>
    );
};

export default YearPicker;
