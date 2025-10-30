import { PropsWithChildren } from 'react';

import s from './container.module.scss';

export const Container = ({ children }: PropsWithChildren) => (
    <div
        className={s['container']}
    >
        {children}
    </div>
);
