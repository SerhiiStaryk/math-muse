import { Card, CardContent, Typography, Stack, Box, Slider, Divider } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import type { Settings } from '@/helpers';

export const DifficultySettings = () => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (key: keyof Settings, value: number) => {
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
          🎯 Difficulty Levels
        </Typography>

        <Stack spacing={3}>
          {/* Addition & Subtraction */}
          <Box>
            <Typography
              variant='subtitle1'
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              ➕ ➖ Addition & Subtraction
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              gutterBottom
            >
              Numbers up to: {settings.maxNumber}
            </Typography>
            <Slider
              value={settings.maxNumber}
              onChange={(_, value) => handleChange('maxNumber', value as number)}
              min={5}
              max={100}
              step={5}
              marks={[
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
              valueLabelDisplay='auto'
              sx={{ mt: 2, mb: 1 }}
            />
          </Box>

          <Divider />

          {/* Multiplication */}
          <Box>
            <Typography
              variant='subtitle1'
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              ✖️ Multiplication Tables
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              gutterBottom
            >
              Practice up to: {settings.maxMultiplicationTable} × {settings.maxMultiplicationTable}
            </Typography>
            <Slider
              value={settings.maxMultiplicationTable}
              onChange={(_, value) => handleChange('maxMultiplicationTable', value as number)}
              min={5}
              max={12}
              step={1}
              marks={[
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 12, label: '12' },
              ]}
              valueLabelDisplay='auto'
              sx={{ mt: 2, mb: 1 }}
            />
          </Box>

          <Divider />

          {/* Division */}
          <Box>
            <Typography
              variant='subtitle1'
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              ➗ Division
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              gutterBottom
            >
              Numbers up to: {settings.maxDivisionNumber}
            </Typography>
            <Slider
              value={settings.maxDivisionNumber}
              onChange={(_, value) => handleChange('maxDivisionNumber', value as number)}
              min={10}
              max={100}
              step={10}
              marks={[
                { value: 10, label: '10' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
              valueLabelDisplay='auto'
              sx={{ mt: 2, mb: 1 }}
            />
          </Box>

          <Divider />

          {/* Missing Number */}
          <Box>
            <Typography
              variant='subtitle1'
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              ⁉️ Missing Number
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              gutterBottom
            >
              Numbers up to: {settings.maxMissingNumber}
            </Typography>
            <Slider
              value={settings.maxMissingNumber}
              onChange={(_, value) => handleChange('maxMissingNumber', value as number)}
              min={10}
              max={50}
              step={5}
              marks={[
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 50, label: '50' },
              ]}
              valueLabelDisplay='auto'
              sx={{ mt: 2, mb: 1 }}
            />
          </Box>

          <Divider />

          {/* True or False */}
          <Box>
            <Typography
              variant='subtitle1'
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              ✅ True or False
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              gutterBottom
            >
              Numbers up to: {settings.maxTrueFalseNumber}
            </Typography>
            <Slider
              value={settings.maxTrueFalseNumber}
              onChange={(_, value) => handleChange('maxTrueFalseNumber', value as number)}
              min={10}
              max={50}
              step={5}
              marks={[
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 50, label: '50' },
              ]}
              valueLabelDisplay='auto'
              sx={{ mt: 2, mb: 1 }}
            />
          </Box>

          <Divider />

          {/* Number Sequence */}
          <Box>
            <Typography
              variant='subtitle1'
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              🔢 Number Sequence
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              gutterBottom
            >
              Numbers up to: {settings.maxSequenceNumber}
            </Typography>
            <Slider
              value={settings.maxSequenceNumber}
              onChange={(_, value) => handleChange('maxSequenceNumber', value as number)}
              min={20}
              max={100}
              step={10}
              marks={[
                { value: 20, label: '20' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
              valueLabelDisplay='auto'
              sx={{ mt: 2, mb: 1 }}
            />
            <Typography
              variant='body2'
              color='text.secondary'
              gutterBottom
              sx={{ mt: 2 }}
            >
              Sequence length: {settings.sequenceLength} numbers
            </Typography>
            <Slider
              value={settings.sequenceLength}
              onChange={(_, value) => handleChange('sequenceLength', value as number)}
              min={3}
              max={7}
              step={1}
              marks={[
                { value: 3, label: '3' },
                { value: 5, label: '5' },
                { value: 7, label: '7' },
              ]}
              valueLabelDisplay='auto'
              sx={{ mt: 2, mb: 1 }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
