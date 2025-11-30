import { PATH_DASHBOARD, PATH_SETTINGS } from '@/constants';
import type { CardType } from '@/types';

export const UTILITY_CARDS: CardType[] = [
  {
    path: PATH_DASHBOARD,
    title: 'nav.dashboard',
    emoji: '📊',
    description: 'See your progress and achievements!',
    color: '#FF6B9D',
  },
  {
    path: PATH_SETTINGS,
    title: 'nav.settings',
    emoji: '⚙️',
    description: 'Customize your learning experience',
    color: '#A8E6CF',
  },
];
