import { createBrowserRouter, Navigate } from 'react-router';
import { LandingPage } from '../components/LandingPage';
import { ProductVisualizer } from '../components/ProductVisualizer';
import { Dashboard } from '../components/Dashboard';
import { GenerateImagePage } from '../components/GenerateImagePage';
import { ChatPage } from '../components/ChatPage';
import { AudioToolsPage } from '../components/AudioToolsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/app',
    element: <ProductVisualizer />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/generate-image" replace />,
      },
      {
        path: 'generate-image',
        element: <ProductVisualizer />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'audio',
        element: <AudioToolsPage />,
      },
    ],
  },
]);

