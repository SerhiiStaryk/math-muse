import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Container, Stack, Chip } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import { loadResults } from '@/helpers';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GAME_CARDS, UTILITY_CARDS } from './constants';
import type { GameStats } from '@/types';
import { GameCard } from '@/components/GameCard';

export const HomePage = () => {
  const { settings } = useSettings();
  const [gameStats, setGameStats] = useState<GameStats>({});

  const { t } = useTranslation();

  useEffect(() => {
    const stats: GameStats = {};

    GAME_CARDS.forEach(game => {
      if (game.gameType) {
        const results = loadResults(game.gameType);
        const resultsArray = Object.values(results);
        const total = resultsArray.length;
        const mastered = resultsArray.filter(r => r.correct >= 5).length;
        stats[game.gameType] = { total, mastered };
      }
    });

    setGameStats(stats);
  }, []);

  return (
    <Container maxWidth='lg'>
      <Box sx={{ textAlign: 'center', mb: 6, mt: 2 }}>
        <Typography
          variant={settings.largeText ? 'h2' : 'h3'}
          gutterBottom
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #6C5CE7 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          🎉 Welcome to Math Muse!
        </Typography>
        <Typography
          variant={settings.largeText ? 'h5' : 'h6'}
          color='text.secondary'
          sx={{ mb: 1, fontWeight: 500 }}
        >
          Learn math through fun and colorful games!
        </Typography>
        <Stack
          direction='row'
          spacing={1}
          justifyContent='center'
          flexWrap='wrap'
          gap={2}
        >
          <Chip
            label='🌟 Fun Games'
            color='primary'
          />
          <Chip
            label='🎯 Track Progress'
            color='secondary'
          />
          <Chip
            label='🏆 Earn Achievements'
            color='success'
          />
          <Chip
            label='📚 Learn & Grow'
            color='info'
          />
        </Stack>
      </Box>

      {/* Games Section */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant={settings.largeText ? 'h4' : 'h5'}
          gutterBottom
          sx={{ fontWeight: 700, mb: 3 }}
        >
          🎮 Choose Your Game
        </Typography>
        <Grid
          container
          spacing={3}
        >
          {GAME_CARDS.map(game => (
            <GameCard
              game={game}
              gameStats={gameStats}
            />
          ))}
        </Grid>
      </Box>

      {/* Utilities Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant={settings.largeText ? 'h4' : 'h5'}
          gutterBottom
          sx={{ fontWeight: 700, mb: 3 }}
        >
          🔧 Tools & Settings
        </Typography>
        <Grid
          container
          spacing={3}
        >
          {UTILITY_CARDS.map(card => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
              key={card.path}
            >
              <Card
                component={RouterLink}
                to={card.path}
                sx={{
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: settings.reduceMotion ? 'none' : 'translateY(-4px)',
                    boxShadow: `0px 8px 24px ${card.color}40`,
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, py: 3 }}>
                  <Box
                    sx={{
                      fontSize: settings.largeText ? '4rem' : '3.5rem',
                      flexShrink: 0,
                    }}
                  >
                    {card.emoji}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant={settings.largeText ? 'h5' : 'h6'}
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      {t(card.title)}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                    >
                      {card.description}
                    </Typography>
                  </Box>
                  <Typography
                    variant='h4'
                    color='text.disabled'
                  >
                    →
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Motivational Footer */}
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          px: 3,
          mb: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
        }}
      >
        <Typography
          variant={settings.largeText ? 'h5' : 'h6'}
          sx={{ fontWeight: 600, mb: 1 }}
        >
          🚀 Ready to become a math champion?
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
        >
          Choose a game above and start your amazing math journey!
        </Typography>
      </Box>
    </Container>
  );
};
