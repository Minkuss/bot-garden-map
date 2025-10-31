import s from './header.module.scss';
import { Link } from 'src/shared/ui/link/link';
import botSadLogo from 'src/app/assets/images/bot-sad-logo.png';
import { useCart } from 'src/entities/cart';
import { routes } from 'src/shared/routes';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const { cart } = useCart();

    const navigate = useNavigate();

    return (
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
                        onClick={() => {
                            navigate(routes.MAP);
                        }}
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
                <li
                    className={s['cart']}
                >
                    <span
                        className={s['cart-count']}
                    >
                        {cart.length}
                    </span>
                    <Link
                        href={routes.CART}
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
};
