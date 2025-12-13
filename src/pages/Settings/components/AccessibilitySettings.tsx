import { Card, CardContent, Typography, FormControlLabel, Switch, Stack } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import type { Settings } from '@/helpers';

export const AccessibilitySettings = () => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (key: keyof Settings, value: boolean) => {
    updateSettings({ ...settings, [key]: value });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography
          variant='h6'
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          ♿ Accessibility
        </Typography>

        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.largeText}
                onChange={e => handleChange('largeText', e.target.checked)}
              />
            }
            label='Large Text'
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.highContrast}
                onChange={e => handleChange('highContrast', e.target.checked)}
              />
            }
            label='High Contrast Colors'
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.reduceMotion}
                onChange={e => handleChange('reduceMotion', e.target.checked)}
              />
            }
            label='Reduce Motion & Animations'
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
