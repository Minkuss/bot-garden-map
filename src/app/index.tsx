import React from 'react';

import { App } from './app';
import { createRoot } from 'react-dom/client';

import './styles/main.scss';

const reactRoot = createRoot(
  document.getElementById('root')!,
);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
