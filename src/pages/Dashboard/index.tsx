import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Stack,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { loadResults, clearResults } from '@/helpers';
import { GameType, type ResultsData, type ResultRecord } from '@/types';
import { GameResult } from '@/components/GameResult';
import { useSettings } from '@/context/SettingsContext';

const DEFAULT_RESULTS: ResultsData = {
  multiply: {},
  divide: {},
  compare: {},
  add: {},
  subtract: {},
  missingNumber: {},
  trueFalse: {},
  numberSequence: {},
  timeChallenge: {},
};

const GAME_EMOJIS: Record<GameType, string> = {
  add: '➕',
  subtract: '➖',
  multiply: '✖️',
  divide: '➗',
  compare: '⚖️',
  missingNumber: '⁉️',
  trueFalse: '✅',
  numberSequence: '🔢',
  timeChallenge: '⏰',
};

const GAME_NAMES: Record<GameType, string> = {
  add: 'Addition',
  subtract: 'Subtraction',
  multiply: 'Multiplication',
  divide: 'Division',
  compare: 'Comparison',
  missingNumber: 'Missing Number',
  trueFalse: 'True or False',
  numberSequence: 'Number Sequence',
  timeChallenge: 'Time Challenge',
};

const ACHIEVEMENT_BADGES = [
  { threshold: 10, emoji: '🌟', title: 'Getting Started', color: '#FFD93D' },
  { threshold: 50, emoji: '🏅', title: 'Math Explorer', color: '#95E1D3' },
  { threshold: 100, emoji: '🏆', title: 'Math Champion', color: '#FF6B6B' },
  { threshold: 250, emoji: '👑', title: 'Math Master', color: '#6C5CE7' },
  { threshold: 500, emoji: '🚀', title: 'Math Genius', color: '#4ECDC4' },
];

export const DashboardPage = () => {
  const { settings } = useSettings();
  const [results, setResults] = useState<ResultsData>(DEFAULT_RESULTS);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    Object.values(GameType).forEach((type) => {
      const res = loadResults(type);

      setResults((prev) => ({
        ...prev,
        [type]: res ?? {},
      }));
    });
  }, []);

  const stats = useMemo(() => {
    let totalCorrect = 0;
    let totalAttempts = 0;
    let totalMastered = 0;
    const gameStats: Record<
      GameType,
      { correct: number; attempts: number; mastered: number }
    > = {
      add: { correct: 0, attempts: 0, mastered: 0 },
      subtract: { correct: 0, attempts: 0, mastered: 0 },
      multiply: { correct: 0, attempts: 0, mastered: 0 },
      divide: { correct: 0, attempts: 0, mastered: 0 },
      compare: { correct: 0, attempts: 0, mastered: 0 },
      missingNumber: { correct: 0, attempts: 0, mastered: 0 },
      trueFalse: { correct: 0, attempts: 0, mastered: 0 },
      numberSequence: { correct: 0, attempts: 0, mastered: 0 },
      timeChallenge: { correct: 0, attempts: 0, mastered: 0 },
    };

    Object.entries(results).forEach(([gameType, records]) => {
      Object.values(records as Record<string, ResultRecord>).forEach(
        (record) => {
          totalCorrect += record.correct;
          totalAttempts += record.attempts;
          gameStats[gameType as GameType].correct += record.correct;
          gameStats[gameType as GameType].attempts += record.attempts;

          if (record.correct >= 5) {
            totalMastered += 1;
            gameStats[gameType as GameType].mastered += 1;
          }
        }
      );
    });

    const accuracy =
      totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    return {
      totalCorrect,
      totalAttempts,
      totalMastered,
      accuracy,
      gameStats,
    };
  }, [results]);

  const currentBadge = useMemo(() => {
    for (let i = ACHIEVEMENT_BADGES.length - 1; i >= 0; i--) {
      if (stats.totalCorrect >= ACHIEVEMENT_BADGES[i].threshold) {
        return ACHIEVEMENT_BADGES[i];
      }
    }
    return null;
  }, [stats.totalCorrect]);

  const nextBadge = useMemo(() => {
    return ACHIEVEMENT_BADGES.find(
      (badge) => stats.totalCorrect < badge.threshold
    );
  }, [stats.totalCorrect]);

  const handleReset = () => {
    clearResults();
    setResults(DEFAULT_RESULTS);
    setConfirmReset(false);
  };

  const gameKeys = Object.keys(results) as GameType[];
  const hasAnyResults = stats.totalAttempts > 0;

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant={settings.largeText ? 'h3' : 'h4'}
          sx={{ fontWeight: 700 }}
        >
          📊 Your Progress Dashboard
        </Typography>
        {hasAnyResults && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => setConfirmReset(true)}
            size={settings.largeText ? 'large' : 'medium'}
          >
            Reset All Results
          </Button>
        )}
      </Box>

      {!hasAnyResults ? (
        <Alert
          severity="info"
          sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
        >
          🎯 Start playing games to see your progress here! Your achievements,
          statistics, and mastered problems will appear on this dashboard.
        </Alert>
      ) : (
        <>
          {/* Achievement Badge Section */}
          <Card
            sx={{
              mb: 3,
              background: `linear-gradient(135deg, ${
                currentBadge?.color || '#4ECDC4'
              }22 0%, ${currentBadge?.color || '#4ECDC4'}11 100%)`,
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                flexWrap="wrap"
              >
                <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                  <Typography
                    variant="h1"
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
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {currentBadge
                      ? `Current Level: ${currentBadge.title}`
                      : 'Start Your Journey!'}
                  </Typography>
                  {nextBadge && (
                    <>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Next: {nextBadge.emoji} {nextBadge.title} (
                        {stats.totalCorrect}/{nextBadge.threshold} correct
                        answers)
                      </Typography>
                      <LinearProgress
                        variant="determinate"
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
                      variant="body1"
                      color="success.main"
                      sx={{ fontWeight: 600 }}
                    >
                      🎉 Maximum level achieved! You're a true Math Master!
                    </Typography>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Overall Statistics */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Typography
                    variant="h3"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                  >
                    {stats.totalCorrect}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ✅ Correct Answers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Typography
                    variant="h3"
                    color="secondary"
                    sx={{ fontWeight: 700 }}
                  >
                    {stats.totalAttempts}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📝 Total Attempts
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Typography
                    variant="h3"
                    color="success.main"
                    sx={{ fontWeight: 700 }}
                  >
                    {stats.accuracy}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    🎯 Accuracy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Typography
                    variant="h3"
                    color="info.main"
                    sx={{ fontWeight: 700 }}
                  >
                    {stats.totalMastered}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ⭐ Mastered Problems
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Game-Specific Statistics */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                🎮 Game Breakdown
              </Typography>
              <Grid container spacing={2}>
                {gameKeys.map((gameType) => {
                  const gameStat = stats.gameStats[gameType];
                  const gameAccuracy =
                    gameStat.attempts > 0
                      ? Math.round((gameStat.correct / gameStat.attempts) * 100)
                      : 0;

                  return (
                    <Grid item xs={12} sm={6} md={4} key={gameType}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <Typography variant="h5">
                              {GAME_EMOJIS[gameType]}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600 }}
                            >
                              {GAME_NAMES[gameType]}
                            </Typography>
                          </Stack>
                          <Divider sx={{ my: 1 }} />
                          {gameStat.attempts === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 2 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontStyle: 'italic' }}
                              >
                                Not played yet
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
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
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Correct:
                                </Typography>
                                <Typography
                                  variant="body2"
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
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Accuracy:
                                </Typography>
                                <Chip
                                  label={`${gameAccuracy}%`}
                                  size="small"
                                  color={
                                    gameAccuracy >= 80
                                      ? 'success'
                                      : gameAccuracy >= 60
                                      ? 'primary'
                                      : 'warning'
                                  }
                                />
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Mastered:
                                </Typography>
                                <Typography
                                  variant="body2"
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
                })}
              </Grid>
            </CardContent>
          </Card>

          {/* Motivational Messages */}
          {stats.accuracy >= 90 && (
            <Alert
              severity="success"
              sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
            >
              🌟 Outstanding! Your accuracy is excellent! Keep up the amazing
              work!
            </Alert>
          )}
          {stats.accuracy >= 70 && stats.accuracy < 90 && (
            <Alert
              severity="info"
              sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
            >
              👍 Great job! You're doing really well! Keep practicing to improve
              even more!
            </Alert>
          )}
          {stats.totalMastered >= 20 && (
            <Alert
              severity="success"
              sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
            >
              🏆 Wow! You've mastered {stats.totalMastered} problems! You're
              becoming a math expert!
            </Alert>
          )}
        </>
      )}

      {/* Detailed Results Tables */}
      {hasAnyResults && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            📋 Detailed Results
          </Typography>
          {gameKeys.map((key) => (
            <GameResult key={key} type={key} items={results[key]} />
          ))}
        </Box>
      )}

      {/* Reset Confirmation Dialog */}
      <Dialog open={confirmReset} onClose={() => setConfirmReset(false)}>
        <DialogTitle>⚠️ Reset All Results?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to reset all your progress? This will delete
            all your statistics, achievements, and mastered problems.
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            This action cannot be undone!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmReset(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleReset} variant="contained" color="error">
            Reset Everything
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
