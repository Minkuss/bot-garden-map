import s from './header.module.scss';
import { Link } from 'src/shared/ui/link/link';
import botSadLogo from 'src/app/assets/images/bot-sad-logo.png';
import BasketLight from 'src/app/assets/images/svg/basket-light.svg?react';
import { useCart } from 'src/entities/cart';
import { routes } from 'src/shared/routes';
import { HeaderLink } from 'src/features/header';
import { Container } from 'src/shared/ui/container/container';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const Header = () => {
    const { cart } = useCart();
    const cartRef = useRef<HTMLLIElement>(null);
    const { contextSafe } = useGSAP({ scope: cartRef });

    const handleCartClicked = contextSafe(() => {
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

    useEffect(() => {
        window.addEventListener('_cart_changed', handleCartClicked);

        return () => {
            window.removeEventListener('_cart_changed', handleCartClicked);
        };
    }, [ handleCartClicked ]);

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
                </ul>
                <div
                    className={s['divider']}
                />
            </nav>
        </Container>
    );
};
