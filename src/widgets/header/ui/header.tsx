import s from './header.module.scss';
import { Link } from 'src/shared/ui/link/link';
import botSadLogo from 'src/app/assets/images/bot-sad-logo.png';
import BasketLight from 'src/app/assets/images/svg/basket-light.svg?react';
import { useCart } from 'src/entities/cart';
import { routes } from 'src/shared/routes';
import { HeaderLink } from 'src/features/header';

export const Header = () => {
    const { cart } = useCart();

    return (
        <nav
            className={s['nav']}
        >
            <ul
                className={s['nav__list']}
            >
                <div
                    className={s['wrapper']}
                >
                    <li>
                        <img
                            src={botSadLogo}
                            alt={'БотСад'}
                            className={s['bot-sad-logo']}
                        />
                    </li>
                    <li>
                        <HeaderLink
                            href={'#'}
                        >
                            главная
                        </HeaderLink>
                    </li>
                    <li>
                        <HeaderLink
                            href={'#'}
                        >
                            карта
                        </HeaderLink>
                    </li>
                    <li>
                        <HeaderLink
                            href={'#'}
                        >
                            контакты
                        </HeaderLink>
                    </li>
                </div>
                <li
                    className={s['cart']}
                >
                    <span
                        className={s['cart-count']}
                    >
                        {cart.length}
                    </span>
                    <BasketLight/>
                    <Link
                        href={routes.CART}
                    >
                        корзина
                    </Link>
                </li>
            </ul>
            <div
                className={s['divider']}
            />
        </nav>
    );
};
