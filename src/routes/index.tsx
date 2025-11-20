import { createBrowserRouter } from 'react-router';
import { LandingPage } from '../components/LandingPage';
import { ProductVisualizer } from '../components/ProductVisualizer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/app',
    element: <ProductVisualizer />,
  },
]);

