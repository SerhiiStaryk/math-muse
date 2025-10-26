import { PATH_COMPARE, PATH_DASHBOARD, PATH_DIVIDE, PATH_MULTIPLY, PATH_ROOT, PATH_SETTINGS } from '@/constants';
import HomeIcon from '@mui/icons-material/Home';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CalculateIcon from '@mui/icons-material/Calculate';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

export const navItems = [
  { path: PATH_ROOT, title: 'Home', icon: HomeIcon },
  { path: PATH_MULTIPLY, title: 'Multiply', icon: CalculateIcon },
  { path: PATH_DIVIDE, title: 'Divide', icon: CalculateIcon },
  { path: PATH_COMPARE, title: 'Compare', icon: CompareArrowsIcon },
  { path: PATH_DASHBOARD, title: 'Dashboard', icon: DashboardIcon },
  { path: PATH_SETTINGS, title: 'Settings', icon: SettingsIcon },
];
