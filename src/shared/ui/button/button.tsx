import classNames from 'classnames';
import s from './button.module.scss';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    label: string;
    variant: 'contained' | 'outlined',
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: IButtonProps) => {
    const { label, variant, disabled = false, onClick, ...rest } = props;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { contextSafe } = useGSAP({ scope: buttonRef });

    const handleClickAnimation = contextSafe(() => {
        const tl = gsap.timeline();

        tl.to(buttonRef.current, {
            duration: 0.12,
            y: -50,
            ease: 'power2.out',
        })
            .to(buttonRef.current, {
                duration: 0.1,
                y: 0,
                ease: 'bounce.out',
            });
    });

    return (
        <button
            {...rest}
            onClick={e => {
                handleClickAnimation();
                onClick?.(e);
            }}
            className={classNames(
                s['button'],
                variant === 'contained' && s['button--contained'],
                variant === 'outlined' && s['button--outlined'],
                disabled && s['button--disabled'],
            )}
            disabled={disabled}
            ref={buttonRef}
        >
            {label}
        </button>
    );
};
