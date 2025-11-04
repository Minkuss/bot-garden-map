import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import s from './headerLink.module.scss';
import ChevronRight from 'src/app/assets/images/svg/chevron-right.svg?react';

interface IHeaderLinkProps extends PropsWithChildren {
    href: string;
}

export const HeaderLink = (props: IHeaderLinkProps) => {
    const { href, children } = props;

    return (
        <Link
            className={s['link']}
            to={href}
        >
            {children}
            <ChevronRight/>
        </Link>
    );
};
