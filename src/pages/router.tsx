import { createBrowserRouter } from 'react-router-dom';
import { routes } from 'src/shared/routes';

export const router = createBrowserRouter([
    {
        path: routes.MAP,
        element: <div></div>,
    },
]);
