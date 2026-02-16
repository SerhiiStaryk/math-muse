import { GameType } from '@/types';
import { useGameSession } from '@/hooks';
import { GamePageLayout } from '@/components';

export const DividePage = () => {
  const session = useGameSession({
    gameType: GameType.divide,
    questionType: 'divide',
  });

  return (
    <GamePageLayout
      title='➗ Division'
      session={session}
    />
  );
};
