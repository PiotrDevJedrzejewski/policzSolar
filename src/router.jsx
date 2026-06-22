import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout/Layout';
import PanelePage from './pages/Panele/PanelePage';
import MagazynyEnergii from './pages/MagazynyEnergii/MagazynyEnergii'
import Farmy from './pages/Farmy/Farmy';
import CyrografWithDevil from './pages/GrandFinale/CyrografWithDevil';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <PanelePage /> },
      { path: 'magazyny-energii', element: <MagazynyEnergii /> },
      { path: 'farmy', element: <Farmy /> },
      { path: 'wyniki', element: <CyrografWithDevil /> },
    ],
  },
]);

export default router;
