import s from './cartItem.module.scss';
import { Button } from 'src/shared/ui/button/button';
import { ModifiedCartItem } from 'src/shared/utils/getModifiedBillboardWithDates';

interface ICartItemProps {
    cartItem: ModifiedCartItem;
    onDelete: (id: string) => void;
}

export const CartItem = (props: ICartItemProps) => {
    const { cartItem, onDelete } = props;

    if (!cartItem) {
        return <div className={s['skeleton-cart-item']}>Загрузка...</div>;
    }

    return (
        <div
            className={s['cart-item']}
        >
            <div
                className={s['info']}
            >
                <div
                    className={s['image-wrapper']}
                >
                    <img
                        className={s['banner-image']}
                        src={cartItem?.photo_url}
                        alt={'Баннер'}
                    />
                </div>
                <div
                    className={s['info-text']}
                >
                    <span>
                        {cartItem?.address}
                    </span>
                    <span>
                        {`Срок аренды: ${cartItem.start_date} - ${cartItem.end_date}`}
                    </span>
                </div>
            </div>
            <div
                className={s['price-button']}
            >
                <span
                    className={s['price']}
                >
                    {`${cartItem?.rent_price} руб/ мес`}
                </span>
                <Button
                    label={'Удалить'}
                    variant={'outlined'}
                    onClick={() => onDelete(cartItem.id)}
                />
            </div>
        </div>
    );
};
