import { GameType, type ResultRecord } from '@/types';

export type Key = string;

export type Settings = {
  useMultipleChoice: boolean;
};

const PREFIX = 'FunMathame_v1.';

export const loadResults = (type: GameType): Record<string, ResultRecord> => {
  const raw = localStorage.getItem(PREFIX + type);

  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse results', e);
    return {};
  }
};

const saveResults = (data: Record<string, ResultRecord>, type: GameType) => {
  localStorage.setItem(PREFIX + type, JSON.stringify(data));
};

export const clearResults = () => {
  Object.values(GameType).forEach(type => {
    localStorage.removeItem(PREFIX + type);
  });
};

export const recordAttempt = (task: string, correct: boolean, type: GameType) => {
  const all = loadResults(type);

  const r = all[task] || { task, correct: 0, attempts: 0 };

  r.attempts += 1;

  if (correct) r.correct += 1;

  all[task] = r;

  saveResults(all, type);
};

export const loadSettings = (): Settings => {
  const raw = localStorage.getItem(PREFIX + 'settings');

  if (!raw) return { useMultipleChoice: true };

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse settings', e);
    return { useMultipleChoice: true };
  }
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem(PREFIX + 'settings', JSON.stringify(settings));
};

export const masteredTasks = (type: GameType): Set<string> => {
  const all = loadResults(type);

  const s = new Set<string>();

  Object.values(all).forEach(r => {
    if (r.correct > 5) s.add(r.task);
  });

  return s;
};
