import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ReduxProvider from '~/redux/ReduxProvider.tsx';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </StrictMode>
);
