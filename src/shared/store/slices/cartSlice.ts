import { StoreSlice } from '../types';
import { BookingCreateParams, cartApi } from 'src/entities/cart';
import toast from 'react-hot-toast';

export type CartItem = {
    id: string;
    start: string;
    end: string;
    side: string;
};

export interface CartSlice {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: (params: BookingCreateParams) => Promise<void>;
}

export const createCartSlice: StoreSlice<CartSlice> = (set, get) => ({
    cart: [],

    addToCart: item => {
        const { cart } = get();
        // Проверяем, нет ли уже такого товара
        const exists = cart.some(i => i.id === item.id);
        if (!exists) {
            set({ cart: [ ...cart, item ] });
        }
    },

    removeFromCart: itemId => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.id !== itemId) });
    },

    clearCart: async params => {
        try {
            await cartApi.createBooking(params);
            toast.success('Заявка успешно отправлена');
            set({ cart: [] });
        } catch (error) {
            console.error(error);
            toast.error('Произошла ошибка, обратитесь в службу поддержки.');
            throw error;
        }
    },
});
