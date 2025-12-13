import { Card, CardContent, Typography, FormControlLabel, Switch, Stack, Box, Chip } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import type { Settings } from '@/helpers';

export const PracticeSettings = () => {
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
          🎓 Practice & Help
        </Typography>

        <Stack spacing={2}>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.practiceMode}
                  onChange={e => handleChange('practiceMode', e.target.checked)}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Practice Mode
                  {settings.practiceMode && (
                    <Chip
                      label='Active'
                      size='small'
                      color='success'
                    />
                  )}
                </Box>
              }
            />
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ ml: 4 }}
            >
              No timer, extra help available
            </Typography>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={settings.enableHints}
                onChange={e => handleChange('enableHints', e.target.checked)}
              />
            }
            label='Show Hints'
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.showProgress}
                onChange={e => handleChange('showProgress', e.target.checked)}
              />
            }
            label='Show Score & Progress'
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.autoAdvanceOnCorrect}
                onChange={e => handleChange('autoAdvanceOnCorrect', e.target.checked)}
              />
            }
            label='Auto-advance after correct answer'
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
