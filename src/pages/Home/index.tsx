import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Stack,
  Chip,
} from '@mui/material';
import {
  PATH_ADD,
  PATH_SUBTRACT,
  PATH_MULTIPLY,
  PATH_DIVIDE,
  PATH_COMPARE,
  PATH_DASHBOARD,
  PATH_SETTINGS,
  PATH_MISSING_NUMBER,
  PATH_TRUE_FALSE,
  PATH_NUMBER_SEQUENCE,
  PATH_TIME_CHALLENGE,
} from '@/constants';
import { useSettings } from '@/context/SettingsContext';
import { loadResults } from '@/helpers';
import { GameType } from '@/types';
import { useEffect, useState } from 'react';

type GameCard = {
  path: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  gameType?: GameType;
};

const GAME_CARDS: GameCard[] = [
  {
    path: PATH_ADD,
    title: 'Addition',
    emoji: '➕',
    description: 'Add numbers together and become a math star!',
    color: '#FF6B6B',
    gameType: GameType.add,
  },
  {
    path: PATH_SUBTRACT,
    title: 'Subtraction',
    emoji: '➖',
    description: 'Take away numbers and solve fun puzzles!',
    color: '#4ECDC4',
    gameType: GameType.subtract,
  },
  {
    path: PATH_MULTIPLY,
    title: 'Multiplication',
    emoji: '✖️',
    description: 'Master your times tables with exciting challenges!',
    color: '#95E1D3',
    gameType: GameType.multiply,
  },
  {
    path: PATH_DIVIDE,
    title: 'Division',
    emoji: '➗',
    description: 'Share and divide numbers like a pro!',
    color: '#FFD93D',
    gameType: GameType.divide,
  },
  {
    path: PATH_COMPARE,
    title: 'Comparison',
    emoji: '⚖️',
    description: 'Find which number is bigger or smaller!',
    color: '#6C5CE7',
    gameType: GameType.compare,
  },
  {
    path: PATH_MISSING_NUMBER,
    title: 'Missing Number',
    emoji: '⁉️',
    description: 'Find the mystery number hiding in the equation!',
    color: '#F39C12',
    gameType: GameType.missingNumber,
  },
  {
    path: PATH_TRUE_FALSE,
    title: 'True or False',
    emoji: '✅',
    description: 'Check if the math equation is correct or wrong!',
    color: '#2ECC71',
    gameType: GameType.trueFalse,
  },
  {
    path: PATH_NUMBER_SEQUENCE,
    title: 'Number Sequence',
    emoji: '🔢',
    description: 'Spot the pattern and complete the sequence!',
    color: '#9B59B6',
    gameType: GameType.numberSequence,
  },
  {
    path: PATH_TIME_CHALLENGE,
    title: 'Time Challenge',
    emoji: '⏰',
    description: 'Read clocks and master time calculations!',
    color: '#E74C3C',
    gameType: GameType.timeChallenge,
  },
];

const UTILITY_CARDS = [
  {
    path: PATH_DASHBOARD,
    title: 'Dashboard',
    emoji: '📊',
    description: 'See your progress and achievements!',
    color: '#FF6B9D',
  },
  {
    path: PATH_SETTINGS,
    title: 'Settings',
    emoji: '⚙️',
    description: 'Customize your learning experience',
    color: '#A8E6CF',
  },
];

export const HomePage = () => {
  const { settings } = useSettings();
  const [gameStats, setGameStats] = useState<
    Record<string, { total: number; mastered: number }>
  >({});

  useEffect(() => {
    const stats: Record<string, { total: number; mastered: number }> = {};

    GAME_CARDS.forEach((game) => {
      if (game.gameType) {
        const results = loadResults(game.gameType);
        const resultsArray = Object.values(results);
        const total = resultsArray.length;
        const mastered = resultsArray.filter((r) => r.correct >= 5).length;
        stats[game.gameType] = { total, mastered };
      }
    });

    setGameStats(stats);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6, mt: 2 }}>
        <Typography
          variant={settings.largeText ? 'h2' : 'h3'}
          gutterBottom
          sx={{
            fontWeight: 800,
            background:
              'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #6C5CE7 100%)',
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
          color="text.secondary"
          sx={{ mb: 1, fontWeight: 500 }}
        >
          Learn math through fun and colorful games!
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mt: 2 }}
        >
          <Chip label="🌟 Fun Games" color="primary" />
          <Chip label="🎯 Track Progress" color="secondary" />
          <Chip label="🏆 Earn Achievements" color="success" />
          <Chip label="📚 Learn & Grow" color="info" />
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
        <Grid container spacing={3}>
          {GAME_CARDS.map((game) => {
            const stats = game.gameType ? gameStats[game.gameType] : null;

            return (
              <Grid item xs={12} sm={6} md={4} key={game.path}>
                <Card
                  component={RouterLink}
                  to={game.path}
                  sx={{
                    height: '100%',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: settings.reduceMotion
                        ? 'none'
                        : 'translateY(-8px) scale(1.02)',
                      boxShadow: `0px 12px 40px ${game.color}40`,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '6px',
                      background: game.color,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: settings.largeText ? '5rem' : '4rem',
                        mb: 2,
                        filter: settings.reduceMotion
                          ? 'none'
                          : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                      }}
                    >
                      {game.emoji}
                    </Typography>
                    <Typography
                      variant={settings.largeText ? 'h5' : 'h6'}
                      gutterBottom
                      sx={{ fontWeight: 700, color: 'text.primary' }}
                    >
                      {game.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, minHeight: settings.largeText ? 60 : 40 }}
                    >
                      {game.description}
                    </Typography>

                    {stats && stats.total > 0 && (
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        sx={{ mt: 2 }}
                      >
                        <Chip
                          label={`${stats.total} played`}
                          size="small"
                          sx={{
                            backgroundColor: `${game.color}20`,
                            color: game.color,
                            fontWeight: 600,
                          }}
                        />
                        {stats.mastered > 0 && (
                          <Chip
                            label={`⭐ ${stats.mastered}`}
                            size="small"
                            color="success"
                          />
                        )}
                      </Stack>
                    )}

                    <Button
                      variant="contained"
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
                      Play Now!
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
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
        <Grid container spacing={3}>
          {UTILITY_CARDS.map((card) => (
            <Grid item xs={12} sm={6} key={card.path}>
              <Card
                component={RouterLink}
                to={card.path}
                sx={{
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: settings.reduceMotion
                      ? 'none'
                      : 'translateY(-4px)',
                    boxShadow: `0px 8px 24px ${card.color}40`,
                  },
                }}
              >
                <CardContent
                  sx={{ display: 'flex', alignItems: 'center', gap: 3, py: 3 }}
                >
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
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="text.disabled">
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
          background:
            'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
        }}
      >
        <Typography
          variant={settings.largeText ? 'h5' : 'h6'}
          sx={{ fontWeight: 600, mb: 1 }}
        >
          🚀 Ready to become a math champion?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose a game above and start your amazing math journey!
        </Typography>
      </Box>
    </Container>
  );
};
