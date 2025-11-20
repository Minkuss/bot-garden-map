import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/pages/router';
import { initGSAPEffects } from 'src/shared/lib/gsap';

initGSAPEffects();

export const App: FC = () => (
    <RouterProvider
        router={router}
    />
);
