import { Card, CardContent, Typography, FormControlLabel, Switch, Stack, Box, Slider } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import type { Settings } from '@/helpers';

export const TimeSettings = () => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (key: keyof Settings, value: boolean | number) => {
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
          ⏱️ Time Settings
        </Typography>

        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableTimer}
                onChange={e => handleChange('enableTimer', e.target.checked)}
              />
            }
            label='Enable Timer'
          />

          {settings.enableTimer && (
            <Box sx={{ ml: 4 }}>
              <Typography
                variant='body2'
                color='text.secondary'
                gutterBottom
              >
                Time per question: {settings.timePerQuestion} seconds
              </Typography>
              <Slider
                value={settings.timePerQuestion}
                onChange={(_, value) => handleChange('timePerQuestion', value as number)}
                min={10}
                max={60}
                step={5}
                marks={[
                  { value: 10, label: '10s' },
                  { value: 30, label: '30s' },
                  { value: 60, label: '60s' },
                ]}
                valueLabelDisplay='auto'
                sx={{ mt: 2 }}
              />
            </Box>
          )}

          <Box>
            <Typography
              variant='body2'
              color='text.secondary'
              gutterBottom
            >
              Questions per session: {settings.questionsPerSession === 0 ? 'Unlimited' : settings.questionsPerSession}
            </Typography>
            <Slider
              value={settings.questionsPerSession}
              onChange={(_, value) => handleChange('questionsPerSession', value as number)}
              min={0}
              max={50}
              step={5}
              marks={[
                { value: 0, label: '∞' },
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 50, label: '50' },
              ]}
              valueLabelDisplay='auto'
              sx={{ mt: 2 }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
