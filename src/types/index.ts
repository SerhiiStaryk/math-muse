export type HistoryEntry = {
  num1: number;
  num2: number;
  symbol: string;
  result: string;
};

export const GameType = {
  multiply: 'multiply',
  divide: 'divide',
  compare: 'compare',
  add: 'add',
  subtract: 'subtract',
  missingNumber: 'missingNumber',
  trueFalse: 'trueFalse',
  numberSequence: 'numberSequence',
  timeChallenge: 'timeChallenge',
} as const;

export type GameType = (typeof GameType)[keyof typeof GameType];

export type ResultRecord = {
  task: string;
  correct: number;
  attempts: number;
};

export type ResultsRecord = Record<string, ResultRecord>;

export type ResultsData = Record<GameType, ResultsRecord>;

export type GameCardType = {
  path: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  gameType?: GameType;
};

export type GameStats = Record<string, { total: number; mastered: number }>;
