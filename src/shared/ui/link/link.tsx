import { PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import s from './link.module.scss';

interface ILinkProps extends PropsWithChildren {
    href: string;
    onClick?: () => void;
}

export const Link = (props: ILinkProps) => {
    const { children, href, onClick } = props;

    return (
        <RouterLink
            to={href}
            className={s['link']}
            onClick={onClick}
        >
            {children}
        </RouterLink>
    );
};
