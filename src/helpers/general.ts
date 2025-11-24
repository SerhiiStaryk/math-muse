import { MAX_MULTIPLE_VALUE, MULTIPLE_CHOICE_OPTIONS } from '@/constants';

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
  type: 'multiple' | 'divide' | 'add' | 'subtract';
  maxNumber?: number;
  maxMultiplicationTable?: number;
  maxDivisionNumber?: number;
}) => {
  const maxValue = maxNumber || MAX_MULTIPLE_VALUE;
  const maxMultiply = maxMultiplicationTable || MAX_MULTIPLE_VALUE;
  const maxDivide = maxDivisionNumber || 50;
  let symbol: string;

  if (type === 'multiple') {
    symbol = 'x';
  } else if (type === 'divide') {
    symbol = '÷';
  } else if (type === 'add') {
    symbol = '+';
  } else {
    symbol = '-';
  }

  while (true) {
    let a: number;
    let b: number;
    let correct: number;

    if (type === 'multiple') {
      // Multiplication with configurable table size
      a = getRandomNumber(maxMultiply);
      b = getRandomNumber(maxMultiply);
      correct = a * b;
    } else if (type === 'divide') {
      // Division with configurable max number, ensuring whole number results
      b = getRandomNumber(Math.min(12, maxMultiply)); // divisor
      const maxQuotient = Math.floor(maxDivide / b);
      correct = getRandomNumber(Math.max(1, maxQuotient));
      a = b * correct;
    } else if (type === 'add') {
      // Addition: numbers from 0 to maxValue
      a = getRandomNumber(maxValue);
      b = getRandomNumber(maxValue);
      correct = a + b;
    } else {
      // Subtraction: ensure result is non-negative
      a = getRandomNumber(maxValue);
      b = getRandomNumber(a); // b will be between 1 and a
      correct = a - b;
    }

    const task = `${a}${symbol}${b}`;
    if (mastered.has(task)) continue;

    let answers: number[] | undefined;

    if (useMultipleChoice) {
      const answerSet = new Set<number>([correct]);

      // Generate close incorrect answers
      while (answerSet.size < MULTIPLE_CHOICE_OPTIONS) {
        let wrongAnswer: number;

        if (type === 'multiple' || type === 'divide') {
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
