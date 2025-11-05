import { Container } from 'src/shared/ui/container/container';
import { Header } from 'src/widgets/header/ui/header';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from 'src/widgets/footer/ui/footer';
import { routes } from 'src/shared/routes';

export const AppLayout = () => {
    const location = useLocation();

    return (
        <Container>
            <Header/>
            <Outlet/>
            {
                location.pathname === routes.MAP &&
                <Footer/>
            }
        </Container>
    );
};
