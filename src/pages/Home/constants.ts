import {
  PATH_ADD,
  PATH_SUBTRACT,
  PATH_MULTIPLY,
  PATH_DIVIDE,
  PATH_COMPARE,
  PATH_DASHBOARD,
  PATH_SETTINGS,
  PATH_MISSING_NUMBER,
  PATH_TRUE_FALSE,
  PATH_NUMBER_SEQUENCE,
  PATH_TIME_CHALLENGE,
} from '@/constants';
import type { GameCardType } from '@/types';
import { GameType } from '@/types';

export const GAME_CARDS: GameCardType[] = [
  {
    path: PATH_ADD,
    title: 'games.addition',
    emoji: '➕',
    description: 'Add numbers together and become a math star!',
    color: '#FF6B6B',
    gameType: GameType.add,
  },
  {
    path: PATH_SUBTRACT,
    title: 'games.subtraction',
    emoji: '➖',
    description: 'Take away numbers and solve fun puzzles!',
    color: '#4ECDC4',
    gameType: GameType.subtract,
  },
  {
    path: PATH_MULTIPLY,
    title: 'games.multiply',
    emoji: '✖️',
    description: 'Master your times tables with exciting challenges!',
    color: '#95E1D3',
    gameType: GameType.multiply,
  },
  {
    path: PATH_DIVIDE,
    title: 'games.divide',
    emoji: '➗',
    description: 'Share and divide numbers like a pro!',
    color: '#FFD93D',
    gameType: GameType.divide,
  },
  {
    path: PATH_COMPARE,
    title: 'games.compare',
    emoji: '⚖️',
    description: 'Find which number is bigger or smaller!',
    color: '#6C5CE7',
    gameType: GameType.compare,
  },
  {
    path: PATH_MISSING_NUMBER,
    title: 'games.missingNumber',
    emoji: '⁉️',
    description: 'Find the mystery number hiding in the equation!',
    color: '#F39C12',
    gameType: GameType.missingNumber,
  },
  {
    path: PATH_TRUE_FALSE,
    title: 'games.trueFalse',
    emoji: '✅',
    description: 'Check if the math equation is correct or wrong!',
    color: '#2ECC71',
    gameType: GameType.trueFalse,
  },
  {
    path: PATH_NUMBER_SEQUENCE,
    title: 'games.numberSequence',
    emoji: '🔢',
    description: 'Spot the pattern and complete the sequence!',
    color: '#9B59B6',
    gameType: GameType.numberSequence,
  },
  {
    path: PATH_TIME_CHALLENGE,
    title: 'games.timeChallenge',
    emoji: '⏰',
    description: 'Read clocks and master time calculations!',
    color: '#E74C3C',
    gameType: GameType.timeChallenge,
  },
];

export const UTILITY_CARDS = [
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
