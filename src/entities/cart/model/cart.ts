export type CartItem = string;

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
 * @param item
 */
export function removeFromCart(item: CartItem) {
    const cart = getCart().filter(id => id !== item);
    localStorage.setItem('billboardCart', JSON.stringify(cart));
}

/**
 * Оставить заявку
 */
export function leaveOrder() {
    localStorage.removeItem('billboardCart');
}
