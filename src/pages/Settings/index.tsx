import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  LanguageSettings,
  AnswerFormatSettings,
  DifficultySettings,
  TimeSettings,
  FunSettings,
  PracticeSettings,
  AccessibilitySettings,
} from './components';

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography
        variant='h4'
        gutterBottom
        sx={{ mb: 3 }}
      >
        ⚙️ {t('settings.title')}
      </Typography>

      <LanguageSettings />
      <AnswerFormatSettings />
      <DifficultySettings />
      <TimeSettings />
      <FunSettings />
      <PracticeSettings />
      <AccessibilitySettings />
    </Box>
  );
};
