import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components';
import { PATH_COMPARE, PATH_DASHBOARD, PATH_DIVIDE, PATH_MULTIPLY, PATH_ROOT, PATH_SETTINGS } from '@/constants';
import { HomePage, MultiplyPage, DividePage, DashboardPage, SettingsPage, ComparePage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/math-muse/',
    element: <Layout />,
    children: [
      { path: PATH_ROOT, element: <HomePage /> },
      { path: PATH_MULTIPLY, element: <MultiplyPage /> },
      { path: PATH_DIVIDE, element: <DividePage /> },
      { path: PATH_DASHBOARD, element: <DashboardPage /> },
      { path: PATH_SETTINGS, element: <SettingsPage /> },
      { path: PATH_COMPARE, element: <ComparePage /> },
    ],
  },
]);

export default router;
