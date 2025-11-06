import React, { InputHTMLAttributes, PropsWithChildren } from 'react';
import s from './checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithChildren {
    icon?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = props => {
    const {
        icon,
        id,
        className,
        children,
        ...rest
    } = props;

    return (
        <div className={`${s.checkboxWrapper} ${className || ''}`}>
            <input
                id={id}
                type='checkbox'
                className={s.checkboxInput}
                {...rest}
            />
            <label htmlFor={id} className={s.checkboxLabel}>
                <div className={s.checkboxBox}>
                    {icon && <span className={s.icon}>{icon}</span>}
                </div>
                {children && <span className={s.labelText}>{children}</span>}
            </label>
        </div>
    );
};
