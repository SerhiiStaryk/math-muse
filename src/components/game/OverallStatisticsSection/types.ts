export type StatisticsCardType = {
  icon: string;
  title: string;
  color: 'primary' | 'secondary' | 'success.main' | 'info.main';
  id: 'totalCorrect' | 'totalAttempts' | 'accuracy' | 'totalMastered';
};
