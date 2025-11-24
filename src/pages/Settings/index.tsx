import { useCallback } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Stack,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import type { Settings } from '@/helpers';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

export const SettingsPage = () => {
  const { settings, updateSettings } = useSettings();
  const { t, i18n } = useTranslation();

  const handleSettingChange = useCallback(
    (key: keyof Settings, value: boolean | number | string) => {
      const newSettings = { ...settings, [key]: value };
      updateSettings(newSettings);
    },
    [settings, updateSettings]
  );

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography
        variant='h4'
        gutterBottom
        sx={{ mb: 3 }}
      >
        ⚙️ {t('settings.title')}
      </Typography>

      {/* Language Settings */}
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

      {/* Answer Format */}
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
                onChange={e => handleSettingChange('useMultipleChoice', e.target.checked)}
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

      {/* Difficulty Settings */}
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
                onChange={(_, value) => handleSettingChange('maxNumber', value as number)}
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
                onChange={(_, value) => handleSettingChange('maxMultiplicationTable', value as number)}
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
                onChange={(_, value) => handleSettingChange('maxDivisionNumber', value as number)}
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
                onChange={(_, value) => handleSettingChange('maxMissingNumber', value as number)}
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
                onChange={(_, value) => handleSettingChange('maxTrueFalseNumber', value as number)}
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
                onChange={(_, value) => handleSettingChange('maxSequenceNumber', value as number)}
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
                onChange={(_, value) => handleSettingChange('sequenceLength', value as number)}
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

      {/* Time Settings */}
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
                  onChange={e => handleSettingChange('enableTimer', e.target.checked)}
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
                  onChange={(_, value) => handleSettingChange('timePerQuestion', value as number)}
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
                onChange={(_, value) => handleSettingChange('questionsPerSession', value as number)}
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

      {/* Fun & Feedback */}
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
                  onChange={e => handleSettingChange('enableSoundEffects', e.target.checked)}
                />
              }
              label='Sound Effects'
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableCelebrations}
                  onChange={e => handleSettingChange('enableCelebrations', e.target.checked)}
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
                    handleSettingChange('encouragementLevel', value);
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

      {/* Practice & Help */}
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
                    onChange={e => handleSettingChange('practiceMode', e.target.checked)}
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
                  onChange={e => handleSettingChange('enableHints', e.target.checked)}
                />
              }
              label='Show Hints'
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.showProgress}
                  onChange={e => handleSettingChange('showProgress', e.target.checked)}
                />
              }
              label='Show Score & Progress'
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoAdvanceOnCorrect}
                  onChange={e => handleSettingChange('autoAdvanceOnCorrect', e.target.checked)}
                />
              }
              label='Auto-advance after correct answer'
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Accessibility */}
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
                  onChange={e => handleSettingChange('largeText', e.target.checked)}
                />
              }
              label='Large Text'
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.highContrast}
                  onChange={e => handleSettingChange('highContrast', e.target.checked)}
                />
              }
              label='High Contrast Colors'
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.reduceMotion}
                  onChange={e => handleSettingChange('reduceMotion', e.target.checked)}
                />
              }
              label='Reduce Motion & Animations'
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
