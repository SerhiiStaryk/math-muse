import { Button, Typography, CardContent, Grid, Stack, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { GameCardType, GameStats } from '@/types';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { StyledCard } from './styles';

type GameCard = {
  game: GameCardType;
  gameStats: GameStats;
};

export const GameCard = ({ game, gameStats }: GameCard) => {
  const { settings } = useSettings();
  const { t } = useTranslation();

  const stats = game.gameType ? gameStats[game.gameType] : null;

  return (
    <Grid
      size={{
        xs: 12,
        sm: 6,
        md: 4,
      }}
      key={game.path}
    >
      <StyledCard
        component={RouterLink}
        to={game.path}
        game={game}
        settings={settings}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography
            variant='h1'
            sx={{
              fontSize: settings.largeText ? '5rem' : '4rem',
              mb: 2,
              filter: settings.reduceMotion ? 'none' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            }}
          >
            {game.emoji}
          </Typography>
          <Typography
            variant={settings.largeText ? 'h5' : 'h6'}
            gutterBottom
            sx={{ fontWeight: 700, color: 'text.primary' }}
          >
            {t(game.title)}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 2, minHeight: settings.largeText ? 60 : 40 }}
          >
            {t(game.description)}!
          </Typography>

          {stats && stats.total > 0 && (
            <Stack
              direction='row'
              spacing={1}
              justifyContent='center'
              sx={{ mt: 2 }}
            >
              <Chip
                label={`${stats.total} played`}
                size='small'
                sx={{
                  backgroundColor: `${game.color}20`,
                  color: game.color,
                  fontWeight: 600,
                }}
              />
              {stats.mastered > 0 && (
                <Chip
                  label={`⭐ ${stats.mastered}`}
                  size='small'
                  color='success'
                />
              )}
            </Stack>
          )}

          <Button
            variant='contained'
            fullWidth
            size={settings.largeText ? 'large' : 'medium'}
            sx={{
              mt: 3,
              backgroundColor: game.color,
              '&:hover': {
                backgroundColor: game.color,
                filter: 'brightness(0.9)',
              },
              fontWeight: 700,
            }}
          >
            {t('button.playNow')}!
          </Button>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};
