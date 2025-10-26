import { useState, useEffect } from 'react';
import { Box, Typography, FormControlLabel, Switch, Card, CardContent } from '@mui/material';
import { loadSettings, saveSettings, type Settings } from '@/helpers';

export const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings>({
    useMultipleChoice: true,
  });

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleSettingChange = (key: keyof Settings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        Settings
      </Typography>
      <Card>
        <CardContent>
          <Typography
            variant='h6'
            gutterBottom
          >
            Answer Format
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.useMultipleChoice}
                onChange={e => handleSettingChange('useMultipleChoice', e.target.checked)}
              />
            }
            label='Use multiple choice answers'
          />
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mt: 1 }}
          >
            {settings.useMultipleChoice
              ? 'Questions will show multiple choice buttons'
              : 'Questions will require typing the answer'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
