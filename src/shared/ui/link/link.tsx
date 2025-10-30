import { PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import s from './link.module.scss';

interface ILinkProps extends PropsWithChildren {
    href: string;
}

export const Link = (props: ILinkProps) => {
    const { children, href } = props;

    return (
        <RouterLink
            to={href}
            className={s['link']}
        >
            {children}
        </RouterLink>
    );
};
