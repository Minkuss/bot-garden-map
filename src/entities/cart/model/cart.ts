import { BookingCreateParams, cartApi } from 'src/entities/cart';
import toast from 'react-hot-toast';

export type CartItem = {
    id: string;
    start: string;
    end: string;
};

/**
 * Получить корзину
 */
export function getCart(): CartItem[] {
    try {
        return JSON.parse(localStorage.getItem('billboardCart') || '[]');
    } catch {
        return [];
    }
}

/**
 * Добавить в корзину
 * @param item
 */
export function addToCart(item: CartItem) {
    const cart = getCart();
    if (!cart.includes(item)) {
        cart.push(item);
        localStorage.setItem('billboardCart', JSON.stringify(cart));
    }
}

/**
 * Удалить из корзины
 * @param itemId
 */
export function removeFromCart(itemId: string) {
    const cart = getCart().filter(item => item.id !== itemId);
    localStorage.setItem('billboardCart', JSON.stringify(cart));
}

/**
 * Оставить заявку
 */
export async function leaveOrder(params: BookingCreateParams) {
    try {
        await cartApi.createBooking(params);
        toast.success('Заявка успешно отправлена');

        localStorage.removeItem('billboardCart');
    } catch (error) {
        console.error(error);
        toast.error('Произошла ошибка, обратитесь в службу поддержки.');
    }
}
