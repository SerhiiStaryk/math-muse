import { Box, Typography, Card, CardContent, Chip, Stack, Divider, Grid } from '@mui/material';
import { GAME_EMOJIS, GAME_NAMES } from './constants';
import type { GameType } from '@/types';
import { t } from 'i18next';

export type GameStatCardProps = {
  gameAccuracy: number;
  gameType: GameType;
  gameStat: {
    correct: number;
    attempts: number;
    mastered: number;
  };
};

export const GameStatCard = ({ gameAccuracy, gameType, gameStat }: GameStatCardProps) => {
  return (
    <Grid
      size={{
        xs: 12,
        sm: 6,
        md: 4,
      }}
    >
      <Card
        variant='outlined'
        sx={{ height: '100%' }}
      >
        <CardContent>
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            sx={{ mb: 1 }}
          >
            <Typography variant='h5'>{GAME_EMOJIS[gameType]}</Typography>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: 600 }}
            >
              {t(GAME_NAMES[gameType])}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          {gameStat.attempts === 0 ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ fontStyle: 'italic' }}
              >
                Not played yet
              </Typography>
              <Typography
                variant='caption'
                color='text.secondary'
              >
                Start playing to see stats!
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant='body2'
                  color='text.secondary'
                >
                  {t('gameStatCard.correct')}:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600 }}
                >
                  {gameStat.correct} / {gameStat.attempts}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant='body2'
                  color='text.secondary'
                >
                  {t('gameStatCard.accuracy')}:
                </Typography>
                <Chip
                  label={`${gameAccuracy}%`}
                  size='small'
                  color={gameAccuracy >= 80 ? 'success' : gameAccuracy >= 60 ? 'primary' : 'warning'}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant='body2'
                  color='text.secondary'
                >
                  {t('gameStatCard.mastered')}:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600 }}
                >
                  ⭐ {gameStat.mastered}
                </Typography>
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
