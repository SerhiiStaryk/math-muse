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
  unitConverter: '🔄',
};

export const GAME_NAMES: Record<GameType, string> = {
  add: 'games.addition',
  subtract: 'games.subtraction',
  multiply: 'games.multiply',
  divide: 'games.divide',
  compare: 'games.compare',
  missingNumber: 'games.missingNumber',
  trueFalse: 'games.trueFalse',
  numberSequence: 'games.numberSequence',
  timeChallenge: 'games.timeChallenge',
  unitConverter: 'games.unitConverter',
};
