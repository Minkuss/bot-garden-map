import { forwardRef, PropsWithChildren } from 'react';

import s from './container.module.scss';

interface IContainerProps extends PropsWithChildren {
    anchor?: string;
    style?: React.CSSProperties | undefined;
}

export const Container = forwardRef<HTMLElement, IContainerProps>(
    ({ children, anchor, style }, ref) => (
        <section
            className={s['container']}
            style={style}
            id={anchor}
            ref={ref}
        >
            {children}
        </section>
    ),
);
