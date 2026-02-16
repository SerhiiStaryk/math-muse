import { GameType } from '@/types';
import { useGameSession } from '@/hooks';
import { GamePageLayout } from '@/components';
import { useTranslation } from 'react-i18next';

export const DividePage = () => {
  const { t } = useTranslation();
  const session = useGameSession({
    gameType: GameType.divide,
    questionType: GameType.divide,
  });

  return (
    <GamePageLayout
      title={`➗ ${t('games.divide')}`}
      session={session}
    />
  );
};
