import { MAX_MULTIPLE_VALUE } from '@/constants';

export const getRandomNumber = (maxValue: number): number => Math.floor(Math.random() * maxValue) + 1;

export const shuffleArray = (array: number[]): number[] => array.sort(() => Math.random() - 0.5);

export const generateQuestion = ({
  type,
  mastered,
  useMultipleChoice,
}: {
  mastered: Set<string>;
  useMultipleChoice: boolean;
  type: 'multiple' | 'divide';
}) => {
  const symbol = type === 'multiple' ? 'x' : '÷';

  while (true) {
    let a: number;
    let b: number;
    let correct: number;

    if (type === 'multiple') {
      // Звичайне множення
      a = getRandomNumber(MAX_MULTIPLE_VALUE);
      b = getRandomNumber(MAX_MULTIPLE_VALUE);
      correct = a * b;
    } else {
      // Створюємо приклад для ділення так, щоб результат був цілим
      b = getRandomNumber(MAX_MULTIPLE_VALUE);
      correct = getRandomNumber(MAX_MULTIPLE_VALUE);
      a = b * correct;
    }

    const task = `${a}${symbol}${b}`;
    if (mastered.has(task)) continue;

    let answers: number[] | undefined;

    if (useMultipleChoice) {
      const answerSet = new Set<number>([correct]);
      while (answerSet.size < 4) {
        answerSet.add(getRandomNumber(MAX_MULTIPLE_VALUE * 1.2));
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
