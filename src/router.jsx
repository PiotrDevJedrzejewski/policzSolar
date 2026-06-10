import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout/Layout';
import PanelePage from './pages/Panele/PanelePage';
import PompyCiepla from './pages/PompyCiepla/PompyCiepla';
import Farmy from './pages/Farmy/Farmy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <PanelePage /> },
      { path: 'pompy-ciepla', element: <PompyCiepla /> },
      { path: 'farmy', element: <Farmy /> },
    ],
  },
]);

export default router;
