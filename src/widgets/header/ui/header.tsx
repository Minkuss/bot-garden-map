import s from './header.module.scss';
import { Link } from 'src/shared/ui/link/link';
import botSadLogo from 'src/app/assets/images/bot-sad-logo.png';
import BasketLight from 'src/app/assets/images/svg/basket-light.svg?react';
import { useCart } from 'src/entities/cart';
import { routes } from 'src/shared/routes';
import { Container } from 'src/shared/ui/container/container';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import classNames from 'classnames';
import { HeaderLink } from './headerLink/headerLink';
import NiceModal from '@ebay/nice-modal-react';
import LoginModal, { LoginInputs } from 'src/features/loginModal/ui/loginModal';
import toast from 'react-hot-toast';
import UserIcon from 'src/app/assets/images/svg/user.svg?react';
import { useStore } from 'src/shared/store';

export const Header = () => {
    const { cart } = useCart();
    const user = useStore(state => state.user);
    const login = useStore(state => state.login);

    const cartRef = useRef<HTMLLIElement>(null);
    const { contextSafe } = useGSAP({ scope: cartRef });

    const handleCartChanged = contextSafe(() => {
        const tl = gsap.timeline();

        tl.to('#cart-count', {
            duration: 0.3,
            scale: 1.5,
            ease: 'power2.out',
        })
            .to('#cart-count', {
                duration: 0.3,
                scale: 1,
                ease: 'bounce.out',
            });
    });

    const handleShowLoginModal = async() => {
        const data: LoginInputs = await NiceModal.show(LoginModal);

        try {
            await login();
        } catch (error) {
            toast.error('Не удалось авторизоваться.');
        }
    };

    useEffect(() => {
        window.addEventListener('_cart_changed', handleCartChanged);

        return () => {
            window.removeEventListener('_cart_changed', handleCartChanged);
        };
    }, [ handleCartChanged ]);

    return (
        <Container
            anchor={'header'}
            style={{
                scrollSnapAlign: 'start',
            }}
        >
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
                                href={'https://bot-sad.com/'}
                            >
                                главная
                            </HeaderLink>
                        </li>
                        <li>
                            <HeaderLink
                                href={routes.MAP}
                            >
                                карта
                            </HeaderLink>
                        </li>
                        <li>
                            <HeaderLink
                                href={'https://bot-sad.com/contacts/'}
                            >
                                контакты
                            </HeaderLink>
                        </li>
                    </div>
                    <div
                        className={classNames(
                            s['wrapper'],
                            s['right'],
                        )
                    }
                    >
                        {
                            user
                                ? <li
                                    className={s['account']}
                                >
                                    <UserIcon/>
                                    <Link
                                        href={routes.ACCOUNT}
                                    >
                                        аккаунт
                                    </Link>
                                </li>
                                : <li>
                                    <Link
                                        href={'#'}
                                        onClick={handleShowLoginModal}
                                    >
                                        вход
                                    </Link>
                                </li>
                        }
                        <li
                            className={s['cart']}
                            ref={cartRef}
                        >
                            <span
                                className={s['cart-count']}
                                id={'cart-count'}
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
                    </div>
                </ul>
                <div
                    className={s['divider']}
                />
            </nav>
        </Container>
    );
};
