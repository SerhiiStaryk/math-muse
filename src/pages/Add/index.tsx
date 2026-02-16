import { GameType } from '@/types';
import { useGameSession } from '@/hooks';
import { GamePageLayout } from '@/components';
import { useTranslation } from 'react-i18next';

export const AddPage = () => {
  const { t } = useTranslation();
  const session = useGameSession({
    gameType: GameType.add,
    questionType: 'add',
  });

  return (
    <GamePageLayout
      title={`➕ ${t('games.addition')}`}
      session={session}
    />
  );
};
