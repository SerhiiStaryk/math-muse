import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

export const LanguageSettings = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography
          variant='h6'
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <LanguageIcon /> {t('settings.language.title')}
        </Typography>
        <FormControl
          fullWidth
          sx={{ mt: 2 }}
        >
          <InputLabel id='language-select-label'>{t('settings.language.selectLanguage')}</InputLabel>
          <Select
            labelId='language-select-label'
            value={i18n.language}
            label={t('settings.language.selectLanguage')}
            onChange={e => handleLanguageChange(e.target.value)}
          >
            <MenuItem value='en'>🇺🇸 {t('settings.language.english')}</MenuItem>
            <MenuItem value='uk'>🇺🇦 {t('settings.language.ukrainian')}</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};
