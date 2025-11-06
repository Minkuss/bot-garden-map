import classNames from 'classnames';
import s from './button.module.scss';
import React from 'react';

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    label: string;
    variant: 'contained' | 'outlined',
    disabled?: boolean;
}

export const Button = (props: IButtonProps) => {
    const { label, variant, disabled = false, ...rest } = props;

    return (
        <button
            {...rest}
            className={classNames(
                s['button'],
                variant === 'contained' && s['button--contained'],
                variant === 'outlined' && s['button--outlined'],
                disabled && s['button--disabled'],
            )}
            disabled={disabled}
        >
            {label}
        </button>
    );
};
