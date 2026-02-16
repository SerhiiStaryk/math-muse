import { GameType } from '@/types';
import { useGameSession } from '@/hooks';
import { GamePageLayout } from '@/components';

export const SubtractPage = () => {
  const session = useGameSession({
    gameType: GameType.subtract,
    questionType: 'subtract',
  });

  return (
    <GamePageLayout
      title='➖ Subtraction'
      session={session}
    />
  );
};
