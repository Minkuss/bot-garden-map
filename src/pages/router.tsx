import { createBrowserRouter } from 'react-router-dom';
import { routes } from 'src/shared/routes';
import { AppLayout } from 'src/app/layout/AppLayout';
import { MapPage } from 'src/pages/map/ui/page';

export const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                path: routes.MAP,
                element: <MapPage/>,
            },
        ],
    },
]);
