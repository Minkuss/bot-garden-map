import { StoreSlice } from '../types';
import { User } from 'src/entities/account/model/user';

export interface AuthSlice {
    user: User | null;
    isLoading: boolean;
    login: () => Promise<void>;
    register: () => Promise<void>;
    logout: () => void;
}

export const createAuthSlice: StoreSlice<AuthSlice> = set => ({
    user: null,
    isLoading: false,

    login: async() => {
        set({ isLoading: true });
        try {
            // TODO: реальный запрос к API
            const fakeUser: User = {
                id: '1',
                firstName: 'Никита',
                lastName: 'Шиян',
                middleName: 'Алексеевич',
                phoneNumber: '+7 (994) 147-32-44',
                email: 'nikita@yandex.ru',
            };
            set({ user: fakeUser });
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    register: async() => {
        set({ isLoading: true });
        try {
            // TODO: реальный запрос к API
            const fakeUser: User = {
                id: '1',
                firstName: 'Иван',
                lastName: 'Иванов',
                middleName: 'Иванович',
                phoneNumber: '+7 999 000-00-00',
                email: 'ivan@example.com',
            };
            set({ user: fakeUser });
        } catch (error) {
            console.error('Register error:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    logout: () => {
        set({ user: null });
    },
});
