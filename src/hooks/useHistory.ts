import type { HistoryEntry } from '@/types';
import { useState } from 'react';

type UseHistoryProps = {
  num1: number;
  num2: number;
};

export const useHistory = ({ num1, num2 }: UseHistoryProps) => {
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleSetHistory = (correctAnswer: boolean, symbol: string) => {
    setAttempts(prev => prev + 1);
    setHistory(prev => [...prev, { num1, num2, symbol, result: correctAnswer ? '✔' : '✘' }]);
  };

  return { score, setScore, attempts, history, isCorrect, setIsCorrect, handleSetHistory };
};
