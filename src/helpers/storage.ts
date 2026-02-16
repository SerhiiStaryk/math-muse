import { GameType, type ResultRecord } from '@/types';
import { MASTERY_THRESHOLD } from '@/constants';

export type Key = string;

export type Settings = {
  // Answer Format
  useMultipleChoice: boolean;

  // Difficulty Settings per Game Type
  maxNumber: number; // For addition/subtraction
  maxMultiplicationTable: number; // For multiplication (e.g., up to 12x12)
  maxDivisionNumber: number; // For division

  // New Games Settings
  maxMissingNumber: number; // For missing number game
  maxTrueFalseNumber: number; // For true/false game
  maxSequenceNumber: number; // For number sequence game
  sequenceLength: number; // Length of number sequences (3-7)

  // Time Settings
  enableTimer: boolean;
  timePerQuestion: number; // seconds, 0 means unlimited

  // Feedback & Encouragement
  enableSoundEffects: boolean;
  enableCelebrations: boolean; // Confetti/animations on correct answers
  encouragementLevel: 'low' | 'medium' | 'high'; // Frequency of positive messages

  // Practice Mode
  enableHints: boolean;
  showProgress: boolean; // Show streak/score during game
  practiceMode: boolean; // Unlimited time, no penalties

  // Accessibility
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;

  // Game Behavior
  autoAdvanceOnCorrect: boolean;
  requireConfirmation: boolean; // Confirm answer before submitting in text mode
  questionsPerSession: number; // 0 means unlimited
};

const PREFIX = 'FunMathame_v1.';

// In-memory cache to avoid frequent LocalStorage reads
const resultsCache: Record<string, Record<string, ResultRecord>> = {};
const saveTimers: Record<string, any> = {};

export const loadResults = (type: GameType): Record<string, ResultRecord> => {
  if (resultsCache[type]) {
    return resultsCache[type];
  }

  const raw = localStorage.getItem(PREFIX + type);

  if (!raw) {
    resultsCache[type] = {};
    return {};
  }

  try {
    const data = JSON.parse(raw);
    resultsCache[type] = data;
    return data;
  } catch (e) {
    console.error('Failed to parse results', e);
    resultsCache[type] = {};
    return {};
  }
};

const saveResults = (data: Record<string, ResultRecord>, type: GameType) => {
  resultsCache[type] = data;

  // Debounce saving to LocalStorage (e.g., wait 2 seconds after the last change)
  if (saveTimers[type]) {
    clearTimeout(saveTimers[type]);
  }

  saveTimers[type] = setTimeout(() => {
    localStorage.setItem(PREFIX + type, JSON.stringify(resultsCache[type]));
    delete saveTimers[type];
  }, 2000);
};

export const clearResults = () => {
  Object.values(GameType).forEach(type => {
    localStorage.removeItem(PREFIX + type);
    delete resultsCache[type];
    if (saveTimers[type]) {
      clearTimeout(saveTimers[type]);
      delete saveTimers[type];
    }
  });
};

export const flushResults = () => {
  Object.keys(saveTimers).forEach(type => {
    const gameType = type as GameType;
    if (saveTimers[gameType]) {
      clearTimeout(saveTimers[gameType]);
      localStorage.setItem(PREFIX + gameType, JSON.stringify(resultsCache[gameType]));
      delete saveTimers[gameType];
    }
  });
};

export const recordAttempt = (task: string, correct: boolean, type: GameType) => {
  const all = loadResults(type);

  const r = all[task] || { task, correct: 0, attempts: 0 };

  r.attempts += 1;
  if (correct) r.correct += 1;

  all[task] = { ...r }; // Create a new object to be sure

  saveResults(all, type);
};

const getDefaultSettings = (): Settings => ({
  // Answer Format
  useMultipleChoice: true,

  // Difficulty Settings
  maxNumber: 10,
  maxMultiplicationTable: 10,
  maxDivisionNumber: 50,

  // New Games Settings
  maxMissingNumber: 20,
  maxTrueFalseNumber: 20,
  maxSequenceNumber: 50,
  sequenceLength: 5,

  // Time Settings
  enableTimer: false,
  timePerQuestion: 30,

  // Feedback & Encouragement
  enableSoundEffects: true,
  enableCelebrations: true,
  encouragementLevel: 'high',

  // Practice Mode
  enableHints: true,
  showProgress: true,
  practiceMode: false,

  // Accessibility
  largeText: false,
  highContrast: false,
  reduceMotion: false,

  // Game Behavior
  autoAdvanceOnCorrect: true,
  requireConfirmation: false,
  questionsPerSession: 10,
});

export const loadSettings = (): Settings => {
  const raw = localStorage.getItem(PREFIX + 'settings');

  if (!raw) return getDefaultSettings();

  try {
    const parsed = JSON.parse(raw);
    // Merge with defaults for backwards compatibility
    return { ...getDefaultSettings(), ...parsed };
  } catch (e) {
    console.error('Failed to parse settings', e);
    return getDefaultSettings();
  }
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem(PREFIX + 'settings', JSON.stringify(settings));
};

export const masteredTasks = (type: GameType): Set<string> => {
  const all = loadResults(type);

  const s = new Set<string>();

  Object.values(all).forEach(r => {
    if (r.correct > MASTERY_THRESHOLD) s.add(r.task);
  });

  return s;
};
