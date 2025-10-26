export type HistoryEntry = {
  num1: number;
  num2: number;
  symbol: string;
  result: string;
};

export const GameType = {
  multiply: 'multiply',
  divde: 'divide',
  compare: 'compare',
} as const;

export type GameType = (typeof GameType)[keyof typeof GameType];

export type ResultRecord = {
  task: string;
  correct: number;
  attempts: number;
};

export type ResultsRecord = Record<string, ResultRecord>;

export type ResultsData = Record<GameType, ResultsRecord>;
