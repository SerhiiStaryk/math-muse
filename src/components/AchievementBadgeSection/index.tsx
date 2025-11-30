import { Box, Typography, Card, CardContent, LinearProgress, Chip, Stack } from '@mui/material';
import { ACHIEVEMENT_BADGES } from './constants';
import { useMemo } from 'react';
import type { Stats } from '@/types';
import { useSettings } from '@/context/SettingsContext';

type AchievementBadgeSectionProps = {
  stats: Stats;
};

export const AchievementBadgeSection = ({ stats }: AchievementBadgeSectionProps) => {
  const { settings } = useSettings();

  const currentBadge = useMemo(() => {
    for (let i = ACHIEVEMENT_BADGES.length - 1; i >= 0; i--) {
      if (stats.totalCorrect >= ACHIEVEMENT_BADGES[i].threshold) {
        return ACHIEVEMENT_BADGES[i];
      }
    }
    return null;
  }, [stats.totalCorrect]);

  const nextBadge = useMemo(() => {
    return ACHIEVEMENT_BADGES.find(badge => stats.totalCorrect < badge.threshold);
  }, [stats.totalCorrect]);

  return (
    <Card
      sx={{
        mb: 3,
        background: `linear-gradient(135deg, ${currentBadge?.color || '#4ECDC4'}22 0%, ${
          currentBadge?.color || '#4ECDC4'
        }11 100%)`,
      }}
    >
      <CardContent>
        <Stack
          direction='row'
          spacing={3}
          alignItems='center'
          flexWrap='wrap'
        >
          <Box sx={{ textAlign: 'center', minWidth: 120 }}>
            <Typography
              variant='h1'
              sx={{ fontSize: settings.largeText ? '5rem' : '4rem' }}
            >
              {currentBadge?.emoji || '🎮'}
            </Typography>
            {currentBadge && (
              <Chip
                label={currentBadge.title}
                sx={{
                  backgroundColor: currentBadge.color,
                  color: '#FFF',
                  fontWeight: 700,
                  fontSize: settings.largeText ? '1rem' : '0.875rem',
                }}
              />
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {currentBadge ? `Current Level: ${currentBadge.title}` : 'Start Your Journey!'}
            </Typography>
            {nextBadge && (
              <>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  gutterBottom
                >
                  Next: {nextBadge.emoji} {nextBadge.title} ({stats.totalCorrect}/{nextBadge.threshold} correct answers)
                </Typography>
                <LinearProgress
                  variant='determinate'
                  value={(stats.totalCorrect / nextBadge.threshold) * 100}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: nextBadge.color,
                      borderRadius: 6,
                    },
                  }}
                />
              </>
            )}
            {!nextBadge && (
              <Typography
                variant='body1'
                color='success.main'
                sx={{ fontWeight: 600 }}
              >
                🎉 Maximum level achieved! You're a true Math Master!
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
