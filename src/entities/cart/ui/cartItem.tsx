import s from './cartItem.module.scss';
import { Button } from 'src/shared/ui/button/button';
import { BillboardDetailDto } from 'src/entities/billboard';

interface ICartItemProps {
    cartItem: BillboardDetailDto;
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
                        src={cartItem?.image_url}
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
                        Срок аренды: 02 нояб - 22 нояб
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
