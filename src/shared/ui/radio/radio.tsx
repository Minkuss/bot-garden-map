import React, { FC, InputHTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import s from './radion.module.scss';

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithChildren {}

export const Radio: FC<IRadioProps> = props => {
    const {
        id,
        className,
        children,
        ...rest
    } = props;

    return (
        <div
            className={s['radio-wrapper']}
        >
            <input
                id={id}
                className={classNames(
                    s['radio-input'],
                    className || '',
                )}
                type={'radio'}
                {...rest}
            />
            <label
                htmlFor={id}
                className={s['radio-label']}
            >
                <div className={s['radio-box']}>
                    <span className={s['icon']}/>
                </div>
                {children && <span className={s['label-text']}>{children}</span>}
            </label>
        </div>
    );
};
