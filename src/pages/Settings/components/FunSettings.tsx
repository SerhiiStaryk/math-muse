import {
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
  Stack,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import type { Settings } from '@/helpers';

export const FunSettings = () => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (key: keyof Settings, value: boolean | string) => {
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
          🎉 Fun & Encouragement
        </Typography>

        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableSoundEffects}
                onChange={e => handleChange('enableSoundEffects', e.target.checked)}
              />
            }
            label='Sound Effects'
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.enableCelebrations}
                onChange={e => handleChange('enableCelebrations', e.target.checked)}
              />
            }
            label='Celebrations & Animations'
          />

          <Box>
            <Typography
              variant='body2'
              gutterBottom
              sx={{ mb: 1 }}
            >
              Encouragement Level:
            </Typography>
            <ToggleButtonGroup
              value={settings.encouragementLevel}
              exclusive
              onChange={(_, value) => {
                if (value !== null) {
                  handleChange('encouragementLevel', value);
                }
              }}
              fullWidth
              sx={{ mb: 1 }}
            >
              <ToggleButton value='low'>Low</ToggleButton>
              <ToggleButton value='medium'>Medium</ToggleButton>
              <ToggleButton value='high'>High</ToggleButton>
            </ToggleButtonGroup>
            <Typography
              variant='caption'
              color='text.secondary'
            >
              {settings.encouragementLevel === 'high' && '🌟 Lots of positive messages!'}
              {settings.encouragementLevel === 'medium' && '👍 Some encouraging words'}
              {settings.encouragementLevel === 'low' && '✓ Just the basics'}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
