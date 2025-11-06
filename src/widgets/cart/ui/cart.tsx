import { useCart } from 'src/entities/cart';
import { CartItem } from 'src/entities/cart/ui/cartItem';
import plural from 'plural-ru';
import s from './cart.module.scss';
import { Button } from 'src/shared/ui/button/button';
import { useEffect, useState } from 'react';
import { billboardApi, BillboardDetailDto } from 'src/entities/billboard';
import { imagesApi } from 'src/shared/api/images-service';
import NiceModal from '@ebay/nice-modal-react';
import CartLeaveOrderModal from 'src/features/cartLeaveOrderModal/ui/cartLeaveOrderModal';

export interface ModifiedCartItem extends BillboardDetailDto {
    start_date: string;
    end_date: string;
}

export const Cart = () => {
    const { cart, remove } = useCart();
    const [ cartItems, setCartItems ] = useState<ModifiedCartItem[]>([]);
    const [ totalCost, setTotalCost ] = useState<number>(0);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const getCartItems = async() => {
            try {
                setLoading(true);

                const cartItems = await Promise.all(
                    cart.map(async item => {
                        const billboard = await billboardApi.getBillboardInfo({
                            id: item.id,
                            side: 'A',
                        });
                        const billboardImages = await imagesApi.getBillboardImages({
                            id: item.id,
                            side: billboard.side,
                        });

                        billboard.image_url = import.meta.env.VITE_REACT_APP_API_URL + billboardImages.images[0].file_path;

                        const modifiedBillboard: ModifiedCartItem = {
                            ...billboard,
                            start_date: item.start,
                            end_date: item.end,
                        };

                        return modifiedBillboard;
                    }),
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
            const result = await NiceModal.show(CartLeaveOrderModal);
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
