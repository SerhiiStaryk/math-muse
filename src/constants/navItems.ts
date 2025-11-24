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
import HomeIcon from '@mui/icons-material/Home';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CalculateIcon from '@mui/icons-material/Calculate';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export interface NavItem {
  path: string;
  title: string;
  translationKey: string;
  icon: any;
}

export interface NavGroup {
  title: string;
  translationKey: string;
  icon?: any;
  items: NavItem[];
}

export const navItems: NavItem[] = [
  {
    path: PATH_ROOT,
    title: 'Home',
    translationKey: 'nav.home',
    icon: HomeIcon,
  },
  {
    path: PATH_DASHBOARD,
    title: 'Dashboard',
    translationKey: 'nav.dashboard',
    icon: DashboardIcon,
  },
  {
    path: PATH_SETTINGS,
    title: 'Settings',
    translationKey: 'nav.settings',
    icon: SettingsIcon,
  },
];

export const navGroups: NavGroup[] = [
  {
    title: 'Games',
    translationKey: 'nav.games',
    icon: SportsEsportsIcon,
    items: [
      {
        path: PATH_ADD,
        title: 'Addition',
        translationKey: 'games.addition',
        icon: AddIcon,
      },
      {
        path: PATH_SUBTRACT,
        title: 'Subtraction',
        translationKey: 'games.subtraction',
        icon: RemoveIcon,
      },
      {
        path: PATH_MULTIPLY,
        title: 'Multiply',
        translationKey: 'games.multiply',
        icon: CalculateIcon,
      },
      {
        path: PATH_DIVIDE,
        title: 'Divide',
        translationKey: 'games.divide',
        icon: CalculateIcon,
      },
      {
        path: PATH_COMPARE,
        title: 'Compare',
        translationKey: 'games.compare',
        icon: CompareArrowsIcon,
      },
      {
        path: PATH_MISSING_NUMBER,
        title: 'Missing Number',
        translationKey: 'games.missingNumber',
        icon: HelpOutlineIcon,
      },
      {
        path: PATH_TRUE_FALSE,
        title: 'True or False',
        translationKey: 'games.trueFalse',
        icon: CheckCircleOutlineIcon,
      },
      {
        path: PATH_NUMBER_SEQUENCE,
        title: 'Number Sequence',
        translationKey: 'games.numberSequence',
        icon: FormatListNumberedIcon,
      },
      {
        path: PATH_TIME_CHALLENGE,
        title: 'Time Challenge',
        translationKey: 'games.timeChallenge',
        icon: AccessTimeIcon,
      },
    ],
  },
];
