import { MAX_MULTIPLE_VALUE, MULTIPLE_CHOICE_OPTIONS } from '@/constants';
import { GameType } from '@/types';

export const getRandomNumber = (maxValue: number): number => Math.floor(Math.random() * maxValue) + 1;

export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const generateQuestion = ({
  type,
  mastered,
  useMultipleChoice,
  maxNumber,
  maxMultiplicationTable,
  maxDivisionNumber,
}: {
  mastered: Set<string>;
  useMultipleChoice: boolean;
  type: GameType;
  maxNumber?: number;
  maxMultiplicationTable?: number;
  maxDivisionNumber?: number;
}) => {
  const maxValue = maxNumber || MAX_MULTIPLE_VALUE;
  const maxMultiply = maxMultiplicationTable || MAX_MULTIPLE_VALUE;
  const maxDivide = maxDivisionNumber || 50;
  let symbol: string;

  if (type === GameType.multiply) {
    symbol = 'x';
  } else if (type === GameType.divide) {
    symbol = '÷';
  } else if (type === GameType.add) {
    symbol = '+';
  } else if (type === GameType.subtract) {
    symbol = '-';
  } else {
    // Default fallback for other game types not yet fully implemented in this generator
    symbol = '?';
  }

  let attempts = 0;
  const MAX_ATTEMPTS = 100;

  while (true) {
    attempts++;
    let a: number;
    let b: number;
    let correct: number;

    if (type === GameType.multiply) {
      // Multiplication with configurable table size
      a = getRandomNumber(maxMultiply);
      b = getRandomNumber(maxMultiply);
      correct = a * b;
    } else if (type === GameType.divide) {
      // Division with configurable max number, ensuring whole number results
      b = getRandomNumber(Math.min(12, maxMultiply)); // divisor
      const maxQuotient = Math.floor(maxDivide / b);
      correct = getRandomNumber(Math.max(1, maxQuotient));
      a = b * correct;
    } else if (type === GameType.add) {
      // Addition: numbers from 0 to maxValue
      a = getRandomNumber(maxValue);
      b = getRandomNumber(maxValue);
      correct = a + b;
    } else if (type === GameType.subtract) {
      // Subtraction: ensure result is non-negative
      a = getRandomNumber(maxValue);
      b = getRandomNumber(a); // b will be between 1 and a
      correct = a - b;
    } else {
      // Basic fallback for unknown types
      a = getRandomNumber(maxValue);
      b = getRandomNumber(maxValue);
      correct = a + b;
    }

    const task = `${a}${symbol}${b}`;
    if (mastered.has(task) && attempts < MAX_ATTEMPTS) continue;

    let answers: number[] | undefined;

    if (useMultipleChoice) {
      const answerSet = new Set<number>([correct]);

      // Generate close incorrect answers
      while (answerSet.size < MULTIPLE_CHOICE_OPTIONS) {
        let wrongAnswer: number;

        if (type === GameType.multiply || type === GameType.divide) {
          // For multiply/divide: ±1 to ±10 from correct answer
          const offset = Math.floor(Math.random() * 10) + 1;
          wrongAnswer = Math.random() < 0.5 ? correct + offset : correct - offset;
          if (wrongAnswer < 1) wrongAnswer = correct + offset; // Keep positive
        } else {
          // For add/subtract: ±1 to ±5 from correct answer
          const offset = Math.floor(Math.random() * 5) + 1;
          wrongAnswer = Math.random() < 0.5 ? correct + offset : correct - offset;
          if (wrongAnswer < 0) wrongAnswer = correct + offset; // Keep non-negative
        }

        answerSet.add(wrongAnswer);
      }
      answers = shuffleArray(Array.from(answerSet));
    }

    return {
      question: `${a} ${symbol} ${b} = ?`,
      correct,
      answers,
      task,
    };
  }
};

export const objtoArray = <T>(obj: { [key: string]: T }): T[] => Object.values(obj);
