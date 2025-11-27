import { AccountUserInfo } from 'src/widgets/accountUserInfo/ui/accountUserInfo';
import { Container } from 'src/shared/ui/container/container';
import { AccountBillboardsInfo } from 'src/widgets/accountBillboardsInfo/ui/accountBillboardsInfo';
import { useAuth } from 'src/shared/auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { routes } from 'src/shared/routes';

export const AccountPage = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={routes.MAP} replace={true}/>;
    }

    return (
        <Container
            style={{
                scrollSnapAlign: 'start',
            }}
        >
            <AccountUserInfo/>
            <AccountBillboardsInfo/>
        </Container>
    );
};
