import { Header } from 'src/widgets/header/ui/header';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from 'src/widgets/footer/ui/footer';
import { routes } from 'src/shared/routes';
import NiceModal from '@ebay/nice-modal-react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from 'src/shared/auth/context/authContext';

export const AppLayout = () => {
    const location = useLocation();

    return (
        <AuthProvider>
            <NiceModal.Provider>
                <div
                    style={{
                        height: '100%',
                    }}
                >
                    <Header/>
                    <Outlet/>
                    {
                        location.pathname === routes.MAP &&
                        <Footer/>
                    }
                    <Toaster/>
                </div>
            </NiceModal.Provider>
        </AuthProvider>
    );
};
