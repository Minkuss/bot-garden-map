import {
    createContext,
    useState,
    useMemo,
    useCallback,
    ReactNode,
} from 'react';
import { User } from 'src/entities/account/model/user';
import { AUTH_STORAGE_KEY } from '../model/model';

interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    login: () => Promise<void>; // сейчас заглушка
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ user, setUser ] = useState<User | null>(() => {
        if (typeof window === 'undefined') return null;
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!raw) return null;

        try {
            return JSON.parse(raw) as User;
        } catch {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            return null;
        }
    });

    const [ isLoading, setIsLoading ] = useState(false);

    const login = useCallback(async() => {
        setIsLoading(true);
        try {
            // TODO: заменить на реальный запрос к бэку
            const fakeUser: User = {
                id: '1',
                firstName: 'Никита',
                lastName: 'Шиян',
                middleName: 'Алексеевич',
                phoneNumber: '+7 (994) 147-32-44',
                email: 'nikita@yandex.ru',
            };

            setUser(fakeUser);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fakeUser));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async() => {
        setIsLoading(true);
        try {
            // TODO: заменить на реальный запрос к бэку
            const fakeUser: User = {
                id: '1',
                firstName: 'Иван',
                lastName: 'Иванов',
                middleName: 'Иванович',
                phoneNumber: '+7 999 000-00-00',
                email: 'ivan@example.com',
            };

            setUser(fakeUser);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fakeUser));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }, []);

    const value = useMemo(
        () => ({ user, isLoading, login, logout, register }),
        [ user, isLoading, login, logout, register ],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
