import { createBrowserRouter } from 'react-router-dom';
import { routes } from 'src/shared/routes';
import { AppLayout } from 'src/app/layout/AppLayout';
import { MapPage } from 'src/pages/map/ui/page';
import { CartPage } from 'src/pages/cart/ui/page';
import { BillboardInfoPage } from 'src/pages/billboardInfo/ui/page';

export const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                path: routes.MAP,
                element: <MapPage/>,
            },
            {
                path: routes.CART,
                element: <CartPage/>,
            },
            {
                path: routes.BILLBOARD_INFO,
                element: <BillboardInfoPage/>,
            },
        ],
    },
], {
    basename: '/map',
});
