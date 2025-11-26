import s from './billboardButtons.module.scss';
import { Button } from 'src/shared/ui/button/button';

interface IBillboardButtonsProps {
    handleAddToCart: () => void;
    handleMakeOrder: () => void;
}

export const BillboardButtons = (props: IBillboardButtonsProps) => {
    const { handleAddToCart, handleMakeOrder } = props;

    return (
        <div
            className={s['btn-group']}
        >
            <Button
                label={'Добавить в корзину'}
                variant={'outlined'}
                onClick={handleAddToCart}
            />
            <Button
                label={'Оставить заявку'}
                variant={'contained'}
                onClick={handleMakeOrder}
            />
        </div>
    );
};
