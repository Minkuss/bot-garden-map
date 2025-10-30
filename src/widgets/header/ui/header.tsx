import s from './header.module.scss';
import { Link } from 'src/shared/ui/link/link';
import botSadLogo from 'src/app/assets/images/bot-sad-logo.png';

export const Header = () => (
    <nav
        className={s['nav']}
    >
        <ul
            className={s['nav__list']}
        >
            <li>
                <img
                    src={botSadLogo}
                    alt={'БотСад'}
                    className={s['bot-sad-logo']}
                />
            </li>
            <li>
                <Link
                    href={'tel:+79635666772'}
                >
                    +7 963 566-67-72
                </Link>
            </li>
            <li>
                <Link
                    href={'tel:+74212707000'}
                >
                    +7(4212) 707 000
                </Link>
            </li>
            <li>
                <Link
                    href={'mailto:mail@bot-sad.com'}
                >
                    mail@bot-sad.com
                </Link>
            </li>
            <li>
                <Link
                    href={'#'}
                >
                    Корзина
                </Link>
            </li>
            <li>
                <Link
                    href={'#'}
                >
                    Аккаунт
                </Link>
            </li>
        </ul>
    </nav>
);
