import { useSettings } from '@/context/SettingsContext';
import type { GameType } from '@/types';
import { Alert } from '@mui/material';

type MotivationalMessagesProps = {
  stats: {
    totalCorrect: number;
    totalAttempts: number;
    totalMastered: number;
    accuracy: number;
    gameStats: Record<
      GameType,
      {
        correct: number;
        attempts: number;
        mastered: number;
      }
    >;
  };
};

export const MotivationalMessages = ({ stats }: MotivationalMessagesProps) => {
  const { settings } = useSettings();

  return (
    <>
      {stats.accuracy >= 90 && (
        <Alert
          severity='success'
          sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
        >
          🌟 Outstanding! Your accuracy is excellent! Keep up the amazing work!
        </Alert>
      )}
      {stats.accuracy >= 70 && stats.accuracy < 90 && (
        <Alert
          severity='info'
          sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
        >
          👍 Great job! You're doing really well! Keep practicing to improve even more!
        </Alert>
      )}
      {stats.totalMastered >= 20 && (
        <Alert
          severity='success'
          sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
        >
          🏆 Wow! You've mastered {stats.totalMastered} problems! You're becoming a math expert!
        </Alert>
      )}
    </>
  );
};
