import { Container } from 'src/shared/ui/container/container';
import { Header } from 'src/widgets/header/ui/header';
import { Outlet } from 'react-router-dom';
import { Footer } from 'src/widgets/footer/ui/footer';

export const AppLayout = () => (
    <Container>
        <Header/>
        <Outlet/>
        <Footer/>
    </Container>
);
