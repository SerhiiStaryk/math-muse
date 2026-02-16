import { PATH_DASHBOARD, PATH_SETTINGS } from '@/constants';
import type { CardType } from '@/types';

export const UTILITY_CARDS: CardType[] = [
  {
    path: PATH_DASHBOARD,
    title: 'nav.dashboard',
    emoji: '📊',
    description: 'nav.dashboardDescription',
    color: '#FF6B9D',
  },
  {
    path: PATH_SETTINGS,
    title: 'nav.settings',
    emoji: '⚙️',
    description: 'nav.settingsDescription',
    color: '#A8E6CF',
  },
];
