import { forwardRef } from 'react';
import s from './input.module.scss';
import classNames from 'classnames';

interface IInputProps {
    label: string;
    error?: boolean;
    errorText?: string;
    fullWidth?: boolean;
    placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
    const { label, errorText = 'Ошибка', error = false, fullWidth = false, placeholder, ...rest } = props;

    return (
        <div
            className={s['error-wrapper']}
        >
            <div
                className={classNames(
                    s['wrapper'],
                    fullWidth && s['wrapper--full'],
                    error && s['wrapper--error'],
                )}
            >
                <label
                    className={classNames(
                        s['label'],
                        error && s['label--error'],
                    )}
                    htmlFor={label}
                >
                    {label}
                </label>
                <input
                    placeholder={placeholder}
                    ref={ref}
                    {...rest}
                />
            </div>
            {error && (
                <span
                    className={s['error']}
                >
                    {errorText}
                </span>
            )}
        </div>
    );
});
