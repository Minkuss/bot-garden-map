import { Container } from 'src/shared/ui/container/container';
import { Header } from 'src/widgets/header/ui/header';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => (
    <Container>
        <Header/>
        <Outlet/>
    </Container>
);
