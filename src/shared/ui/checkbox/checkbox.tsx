import React, { InputHTMLAttributes, PropsWithChildren, useRef } from 'react';
import s from './checkbox.module.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithChildren {
    icon: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = props => {
    const {
        icon,
        id,
        className,
        children,
        checked,
        ...rest
    } = props;
    const iconRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: iconRef });

    const handleClick = contextSafe(() => {
        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
            },
        });

        if (!checked) {
            gsap.fromTo('#checked-path', {
                drawSVG: '0, 0',
            }, {
                drawSVG: '0, 100%',
                duration: 0.7,
            });

            tl.fromTo(boxRef.current, {
                scale: 1,
            }, {
                scale: 1.3,
                duration: 0.2,
            })
            .to(boxRef.current, {
                scale: 1,
                duration: 0.2,
            });
        }
    });

    return (
        <div className={`${s.checkboxWrapper} ${className || ''}`}>
            <input
                id={id}
                type='checkbox'
                checked={checked}
                className={s.checkboxInput}
                onClick={handleClick}
                {...rest}
            />
            <label htmlFor={id} className={s.checkboxLabel}>
                <div ref={boxRef} className={s.checkboxBox}>
                    {icon && <span ref={iconRef} className={s.icon}>{icon}</span>}
                </div>
                {children && <span className={s.labelText}>{children}</span>}
            </label>
        </div>
    );
};
