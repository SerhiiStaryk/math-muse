import { Box, Typography, LinearProgress, Chip, Stack } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';

type GameProgressProps = {
  correctCount: number;
  totalCount: number;
  streak?: number;
};

export const GameProgress = ({ correctCount, totalCount, streak = 0 }: GameProgressProps) => {
  const { settings } = useSettings();

  if (!settings.showProgress) {
    return null;
  }

  const percentage = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
  const accuracy = totalCount > 0 ? Math.round(percentage) : 0;

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Stack
        direction='row'
        spacing={2}
        alignItems='center'
        justifyContent='space-between'
        flexWrap='wrap'
      >
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography
            variant='body2'
            color='text.secondary'
            gutterBottom
          >
            Progress
          </Typography>
          <LinearProgress
            variant='determinate'
            value={percentage}
            sx={{ height: 10, borderRadius: 5, mb: 1 }}
            color={accuracy >= 80 ? 'success' : accuracy >= 60 ? 'primary' : 'warning'}
          />
          <Typography
            variant='caption'
            color='text.secondary'
          >
            {correctCount} / {totalCount} correct ({accuracy}%)
          </Typography>
        </Box>

        <Stack
          direction='row'
          spacing={1}
        >
          <Chip
            label={`Score: ${correctCount}`}
            color='primary'
            size={settings.largeText ? 'medium' : 'small'}
          />
          {streak > 0 && (
            <Chip
              label={`🔥 Streak: ${streak}`}
              color='success'
              size={settings.largeText ? 'medium' : 'small'}
            />
          )}
          {settings.questionsPerSession > 0 && (
            <Chip
              label={`${totalCount} / ${settings.questionsPerSession}`}
              variant='outlined'
              size={settings.largeText ? 'medium' : 'small'}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
