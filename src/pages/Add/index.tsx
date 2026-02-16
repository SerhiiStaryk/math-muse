import { GameType } from '@/types';
import { useGameSession } from '@/hooks';
import { GamePageLayout } from '@/components';

export const AddPage = () => {
  const session = useGameSession({
    gameType: GameType.add,
    questionType: 'add',
  });

  return (
    <GamePageLayout
      title='➕ Addition'
      session={session}
    />
  );
};
