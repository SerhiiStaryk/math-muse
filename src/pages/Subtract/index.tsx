import { GameType } from '@/types';
import { useGameSession } from '@/hooks';
import { GamePageLayout } from '@/components';
import { useTranslation } from 'react-i18next';

export const SubtractPage = () => {
  const { t } = useTranslation();
  const session = useGameSession({
    gameType: GameType.subtract,
    questionType: 'subtract',
  });

  return (
    <GamePageLayout
      title={`➖ ${t('games.subtraction')}`}
      session={session}
    />
  );
};
