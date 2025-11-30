import { useSettings } from '@/context/SettingsContext';
import { ChipList } from './ChipList';
import { StyledWelcomeSectionContainer, StyledWelcomeSectionSubtitle, StyledWelcomeSectionTitle } from './styles';
import { useTranslation } from 'react-i18next';

export const WelcomeSection = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <StyledWelcomeSectionContainer>
      <StyledWelcomeSectionTitle
        gutterBottom
        variant={settings.largeText ? 'h2' : 'h3'}
      >
        🎉 {t('home.welcome')}
      </StyledWelcomeSectionTitle>
      <StyledWelcomeSectionSubtitle variant={settings.largeText ? 'h5' : 'h6'}>
        {t('home.welcomeSectionSubtitle')}!
      </StyledWelcomeSectionSubtitle>
      <ChipList />
    </StyledWelcomeSectionContainer>
  );
};
