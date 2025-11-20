import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './rangeSlider.module.scss';

interface RangeSliderProps {
    min: number;
    max: number;
    step?: number;
    minValue?: number;
    maxValue?: number;
    label?: string;
    suffix?: string;
    onChange?: (min: number, max: number) => void;
    formatValue?: (value: number) => string;
    value?: number[];
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
    min,
    max,
    step = 1,
    minValue: initialMinValue,
    maxValue: initialMaxValue,
    label = 'Цена',
    suffix = '₽',
    onChange,
    formatValue,
    value,
}) => {
    const [ minValue, setMinValue ] = useState(initialMinValue ?? min);
    const [ maxValue, setMaxValue ] = useState(initialMaxValue ?? max);
    const [ isDraggingMin, setIsDraggingMin ] = useState(false);
    const [ isDraggingMax, setIsDraggingMax ] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) {
            setMinValue(value[0]);
            setMaxValue(value[1]);
        }
    }, [ value ]);

    const formatDisplayValue = useCallback(
        (value: number) => {
            if (formatValue) return formatValue(value);
            return value.toLocaleString('ru-RU');
        },
        [ formatValue ],
    );

    const getPercentage = (value: number) => (value - min) / (max - min) * 100;

    const getValueFromPosition = useCallback((clientX: number) => {
        if (!sliderRef.current) return min;

        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + percentage * (max - min);
        return Math.round(rawValue / step) * step;
    }, [ max, min, step ]);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const value = getValueFromPosition(e.clientX);

            if (isDraggingMin) {
                const newMin = Math.min(value, maxValue - step);
                setMinValue(Math.max(min, newMin));
            } else if (isDraggingMax) {
                const newMax = Math.max(value, minValue + step);
                setMaxValue(Math.min(max, newMax));
            }
        },
        [ getValueFromPosition, isDraggingMin, isDraggingMax, maxValue, step, min, minValue, max ],
    );

    const handleMouseUp = useCallback(() => {
        if (isDraggingMin || isDraggingMax) {
            setIsDraggingMin(false);
            setIsDraggingMax(false);
            onChange?.(minValue, maxValue);
        }
    }, [ isDraggingMin, isDraggingMax, minValue, maxValue, onChange ]);

    useEffect(() => {
        if (isDraggingMin || isDraggingMax) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [ isDraggingMin, isDraggingMax, handleMouseMove, handleMouseUp ]);

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains(styles.progress)) {
            const value = getValueFromPosition(e.clientX);
            const distanceToMin = Math.abs(value - minValue);
            const distanceToMax = Math.abs(value - maxValue);

            let newMin = minValue;
            let newMax = maxValue;

            if (distanceToMin < distanceToMax) {
                newMin = Math.min(value, maxValue - step);
                newMin = Math.max(min, newMin);
                setMinValue(newMin);
                onChange?.(newMin, maxValue);
            } else {
                newMax = Math.max(value, minValue + step);
                newMax = Math.min(max, newMax);
                setMaxValue(newMax);
                onChange?.(minValue, newMax);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.label}>{label}</span>
            </div>

            <div className={styles.sliderWrapper}>
                <div
                    ref={sliderRef}
                    className={styles.track}
                    onClick={handleTrackClick}
                >
                    <div
                        className={styles.progress}
                        style={{
                            left: `${getPercentage(minValue)}%`,
                            right: `${100 - getPercentage(maxValue)}%`,
                        }}
                    />

                    <button
                        className={`${styles.thumb} ${isDraggingMin ? styles.active : ''}`}
                        style={{ left: `${getPercentage(minValue)}%` }}
                        onMouseDown={() => setIsDraggingMin(true)}
                        aria-label={`Минимум ${minValue}`}
                    />

                    <button
                        className={`${styles.thumb} ${isDraggingMax ? styles.active : ''}`}
                        style={{ left: `${getPercentage(maxValue)}%` }}
                        onMouseDown={() => setIsDraggingMax(true)}
                        aria-label={`Максимум ${maxValue}`}
                    />
                </div>

                <div className={styles.values}>
                    <span className={styles.value}>
                        {formatDisplayValue(minValue)} {suffix}
                    </span>
                    <span className={styles.value}>
                        {formatDisplayValue(maxValue)} {suffix}
                    </span>
                </div>
            </div>
        </div>
    );
};
