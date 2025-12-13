import { Card, CardContent, Typography, FormControlLabel, Switch } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';

export const AnswerFormatSettings = () => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (checked: boolean) => {
    updateSettings({ ...settings, useMultipleChoice: checked });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography
          variant='h6'
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          📝 Answer Format
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.useMultipleChoice}
              onChange={e => handleChange(e.target.checked)}
            />
          }
          label='Multiple Choice Buttons'
        />
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mt: 1 }}
        >
          {settings.useMultipleChoice ? '✨ Click on answer buttons' : '⌨️ Type your answer'}
        </Typography>
      </CardContent>
    </Card>
  );
};
