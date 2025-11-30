import { useSettings } from '@/context/SettingsContext';
import { ChipList } from './ChipList';
import { StyledWelcomeSectionContainer, StyledWelcomeSectionSubtitle, StyledWelcomeSectionTitle } from './styles';

export const WelcomeSection = () => {
  const { settings } = useSettings();

  return (
    <StyledWelcomeSectionContainer>
      <StyledWelcomeSectionTitle
        gutterBottom
        variant={settings.largeText ? 'h2' : 'h3'}
      >
        🎉 Welcome to Math Muse!
      </StyledWelcomeSectionTitle>
      <StyledWelcomeSectionSubtitle variant={settings.largeText ? 'h5' : 'h6'}>
        Learn math through fun and colorful games!
      </StyledWelcomeSectionSubtitle>
      <ChipList />
    </StyledWelcomeSectionContainer>
  );
};
