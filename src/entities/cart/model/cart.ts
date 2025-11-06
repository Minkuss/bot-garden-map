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
export function leaveOrder() {
    localStorage.removeItem('billboardCart');
}
