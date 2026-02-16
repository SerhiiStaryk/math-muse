import { GameType } from '@/types';
import { useGameSession } from '@/hooks';
import { GamePageLayout } from '@/components';

export const MultiplyPage = () => {
  const session = useGameSession({
    gameType: GameType.multiply,
    questionType: 'multiple',
  });

  return (
    <GamePageLayout
      title='✖️ Multiplication'
      session={session}
    />
  );
};
