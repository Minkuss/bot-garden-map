import { BookingCreateParams } from 'src/entities/cart';
import { CartItem } from 'src/entities/cart/ui/cartItem';
import plural from 'plural-ru';
import s from './cart.module.scss';
import { Button } from 'src/shared/ui/button/button';
import { useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import CartLeaveOrderModal from 'src/features/cartLeaveOrderModal/ui/cartLeaveOrderModal';
import { format, parse } from 'date-fns';
import { getModifiedBillboardWithDates, ModifiedCartItem } from 'src/shared/utils/getModifiedBillboardWithDates';
import { LeaveOrderInputs } from 'src/entities/order/ui/leaveOrderForm';
import { useStore } from 'src/shared/store';

export const Cart = () => {
    const cart = useStore(store => store.cart);
    const remove = useStore(store => store.removeFromCart);
    const clearCart = useStore(store => store.clearCart);
    const [ cartItems, setCartItems ] = useState<ModifiedCartItem[]>([]);
    const [ totalCost, setTotalCost ] = useState<number>(0);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const getCartItems = async() => {
            try {
                setLoading(true);

                const cartItems = await Promise.all(
                    cart.map(async item => await getModifiedBillboardWithDates(item.id, item.side, item.start, item.end)),
                );

                setCartItems(cartItems);
                setTotalCost(cartItems.reduce((acc, item) =>
                    acc + item.rent_price, 0),
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getCartItems();
    }, [ cart ]);

    const handleShowModal = async() => {
        try {
            const result: LeaveOrderInputs = await NiceModal.show(CartLeaveOrderModal);

            const params: BookingCreateParams = {
                billboards: cartItems.map(it => ({
                    billboard_id: it.id,
                    side: it.side,
                    start_date: format(parse(it.start_date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd'),
                    end_date: format(parse(it.end_date, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd'),
                })),
                email: result.email,
                first_name: result.firstName,
                last_name: result.lastName,
                middle_name: result.middleName,
                organization: result.organization,
                phone: result.phoneNumber.replace(/[^\d+]/g, ''),
            };

            clearCart(params);
        } catch (error) {
            console.log('Модальное окно закрыто без сохранения');
        }
    };

    return (
        <div
            className={s['cart']}
        >
            <div
                className={s['heading']}
            >
                <h1>
                    Корзина
                </h1>
                <span
                    className={s['count']}
                >
                    {`${cart.length} ${plural(cart.length, 'товар', 'товара', 'товаров')}`}
                </span>
            </div>
            <div className={s['cart-items']}>
                {loading ? (
                    <span>Загрузка...</span>
                ) : cart.length === 0 ? (
                    <span className={s['empty']}>Корзина пуста</span>
                )
                    : cartItems.map((item: ModifiedCartItem, index) => (
                        <>
                            <CartItem
                                key={item.id}
                                cartItem={item}
                                onDelete={remove}
                            />
                            {
                                cartItems.length - 1 !== index &&
                                <div
                                    className={s['divider']}
                                />
                            }
                        </>
                    ))
                }
            </div>
            <div
                className={s['total-button']}
            >
                <span
                    className={s['total-text']}
                >
                    {`Итого: ${totalCost} руб`}
                </span>
                <Button
                    label={'Оставить заявку'}
                    variant={'contained'}
                    onClick={handleShowModal}
                />
            </div>
        </div>
    );
};
