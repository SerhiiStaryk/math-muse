import type { GameType } from '@/types';

export const GAME_EMOJIS: Record<GameType, string> = {
  add: '➕',
  subtract: '➖',
  multiply: '✖️',
  divide: '➗',
  compare: '⚖️',
  missingNumber: '⁉️',
  trueFalse: '✅',
  numberSequence: '🔢',
  timeChallenge: '⏰',
};

export const GAME_NAMES: Record<GameType, string> = {
  add: 'Addition',
  subtract: 'Subtraction',
  multiply: 'Multiplication',
  divide: 'Division',
  compare: 'Comparison',
  missingNumber: 'Missing Number',
  trueFalse: 'True or False',
  numberSequence: 'Number Sequence',
  timeChallenge: 'Time Challenge',
};
