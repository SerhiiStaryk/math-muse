import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import {
  StyledMotivationalFooterContainer,
  StyledMotivationalFooterSubtitle,
  StyledMotivationalFooterTitle,
} from './styles';

export const MotivationalFooter = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <StyledMotivationalFooterContainer>
      <StyledMotivationalFooterTitle variant={settings.largeText ? 'h5' : 'h6'}>
        🚀 {t('home.motivationalFooterTitle')}?
      </StyledMotivationalFooterTitle>
      <StyledMotivationalFooterSubtitle variant='body1'>
        {t('home.motivationalFooterSubtitle')}!
      </StyledMotivationalFooterSubtitle>
    </StyledMotivationalFooterContainer>
  );
};
