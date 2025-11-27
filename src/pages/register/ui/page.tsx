import { Register } from 'src/widgets/register/ui/register';
import { Container } from 'src/shared/ui/container/container';

export const RegisterPage = () => (
    <Container
        style={{
            scrollSnapAlign: 'start',
        }}
    >
        <Register/>
    </Container>
);
