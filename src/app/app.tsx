import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/pages/router';

export const App: FC = () => <RouterProvider router={router} />;
