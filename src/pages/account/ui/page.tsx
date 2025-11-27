import { AccountUserInfo } from 'src/widgets/accountUserInfo/ui/accountUserInfo';
import { Container } from 'src/shared/ui/container/container';
import { AccountBillboardsInfo } from 'src/widgets/accountBillboardsInfo/ui/accountBillboardsInfo';

export const AccountPage = () => (
    <Container
        style={{
            scrollSnapAlign: 'start',
        }}
    >
        <AccountUserInfo/>
        <AccountBillboardsInfo/>
    </Container>
);
