import { GameType } from '@/types';
import { useGameSession } from '@/hooks';
import { GamePageLayout } from '@/components';
import { useTranslation } from 'react-i18next';

export const MultiplyPage = () => {
  const { t } = useTranslation();
  const session = useGameSession({
    gameType: GameType.multiply,
    questionType: 'multiple',
  });

  return (
    <GamePageLayout
      title={`✖️ ${t('games.multiply')}`}
      session={session}
    />
  );
};
