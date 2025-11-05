import { Cart } from 'src/widgets/cart/ui/cart';
import { Container } from 'src/shared/ui/container/container';

export const CartPage = () => (
    <Container
        style={{
            height: '100vh',
            scrollSnapAlign: 'start',
        }}
    >
        <Cart/>
    </Container>
);
