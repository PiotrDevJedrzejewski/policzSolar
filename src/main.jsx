import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { SolarProvider } from './context/SolarContext';
import router from './router';
import './styles/main.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SolarProvider>
      <RouterProvider router={router} />
    </SolarProvider>
  </StrictMode>,
);
