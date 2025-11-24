import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components';
import {
  PATH_ADD,
  PATH_COMPARE,
  PATH_DASHBOARD,
  PATH_DIVIDE,
  PATH_MULTIPLY,
  PATH_ROOT,
  PATH_SETTINGS,
  PATH_SUBTRACT,
  PATH_MISSING_NUMBER,
  PATH_TRUE_FALSE,
  PATH_NUMBER_SEQUENCE,
  PATH_TIME_CHALLENGE,
} from '@/constants';
import {
  AddPage,
  HomePage,
  MultiplyPage,
  DividePage,
  DashboardPage,
  SettingsPage,
  ComparePage,
  SubtractPage,
  MissingNumberPage,
  TrueFalsePage,
  NumberSequencePage,
  TimeChallengePage,
} from '@/pages';

const router = createBrowserRouter([
  {
    path: '/math-muse/',
    element: <Layout />,
    children: [
      { path: PATH_ROOT, element: <HomePage /> },
      { path: PATH_ADD, element: <AddPage /> },
      { path: PATH_SUBTRACT, element: <SubtractPage /> },
      { path: PATH_MULTIPLY, element: <MultiplyPage /> },
      { path: PATH_DIVIDE, element: <DividePage /> },
      { path: PATH_DASHBOARD, element: <DashboardPage /> },
      { path: PATH_SETTINGS, element: <SettingsPage /> },
      { path: PATH_COMPARE, element: <ComparePage /> },
      { path: PATH_MISSING_NUMBER, element: <MissingNumberPage /> },
      { path: PATH_TRUE_FALSE, element: <TrueFalsePage /> },
      { path: PATH_NUMBER_SEQUENCE, element: <NumberSequencePage /> },
      { path: PATH_TIME_CHALLENGE, element: <TimeChallengePage /> },
    ],
  },
]);

export default router;
