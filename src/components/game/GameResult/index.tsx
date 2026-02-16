import type { GameType, ResultsRecord } from '@/types';
import {
  Box,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Chip,
  LinearProgress,
  Collapse,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';

type GameResultProps = {
  type: GameType;
  items: ResultsRecord;
};

const GAME_NAMES: Record<GameType, string> = {
  add: 'games.addition',
  subtract: 'games.subtraction',
  multiply: 'games.multiply',
  divide: 'games.divide',
  compare: 'games.compare',
  missingNumber: 'games.missingNumber',
  trueFalse: 'games.trueFalse',
  numberSequence: 'games.numberSequence',
  timeChallenge: 'games.timeChallenge',
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

export const GameResult = ({ type, items }: GameResultProps) => {
  const { settings } = useSettings();
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const itemsArray = Object.values(items);

  if (itemsArray.length === 0) {
    return null;
  }

  // Sort by accuracy (desc) then by attempts (desc)
  const sortedItems = [...itemsArray].sort((a, b) => {
    const accA = a.attempts > 0 ? a.correct / a.attempts : 0;
    const accB = b.attempts > 0 ? b.correct / b.attempts : 0;
    if (accB !== accA) return accB - accA;
    return b.attempts - a.attempts;
  });

  const totalCorrect = itemsArray.reduce((sum, item) => sum + item.correct, 0);
  const totalAttempts = itemsArray.reduce((sum, item) => sum + item.attempts, 0);
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const masteredCount = itemsArray.filter(item => item.correct >= 5).length;

  return (
    <Box sx={{ mb: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            mb: expanded ? 2 : 0,
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant='h6'
              sx={{ fontWeight: 600 }}
            >
              {GAME_EMOJIS[type]} {t(GAME_NAMES[type])}
            </Typography>
            <Chip
              label={`${totalCorrect} / ${totalAttempts}`}
              color='primary'
              size={settings.largeText ? 'medium' : 'small'}
            />
            <Chip
              label={`${overallAccuracy}%`}
              color={overallAccuracy >= 80 ? 'success' : overallAccuracy >= 60 ? 'primary' : 'warning'}
              size={settings.largeText ? 'medium' : 'small'}
            />
            {masteredCount > 0 && (
              <Chip
                label={`⭐ ${masteredCount} mastered`}
                color='info'
                size={settings.largeText ? 'medium' : 'small'}
              />
            )}
          </Box>
          <IconButton size='small'>
            <Typography variant='h6'>{expanded ? '▼' : '▶'}</Typography>
          </IconButton>
        </Box>

        <Collapse in={expanded}>
          <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <Table
              size={settings.largeText ? 'medium' : 'small'}
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>{t('resultsTable.problem')}</TableCell>
                  <TableCell
                    align='center'
                    sx={{ fontWeight: 700 }}
                  >
                    {t('resultsTable.correct')}
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{ fontWeight: 700 }}
                  >
                    {t('resultsTable.attempts')}
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{ fontWeight: 700 }}
                  >
                    {t('resultsTable.accuracy')}
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{ fontWeight: 700 }}
                  >
                    {t('resultsTable.status')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedItems.map(entry => {
                  const accuracy = entry.attempts > 0 ? Math.round((entry.correct / entry.attempts) * 100) : 0;
                  const isMastered = entry.correct >= 5;

                  return (
                    <TableRow
                      key={entry.task}
                      sx={{
                        backgroundColor: isMastered ? 'rgba(149, 225, 211, 0.1)' : 'inherit',
                        '&:hover': {
                          backgroundColor: isMastered ? 'rgba(149, 225, 211, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant='body2'
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: settings.largeText ? '1.1rem' : '1rem',
                            fontWeight: 600,
                          }}
                        >
                          {entry.task}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography
                          variant='body2'
                          sx={{ fontWeight: 600, color: 'success.main' }}
                        >
                          {entry.correct}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{entry.attempts}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: 600 }}
                          >
                            {accuracy}%
                          </Typography>
                          <LinearProgress
                            variant='determinate'
                            value={accuracy}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                            color={accuracy >= 80 ? 'success' : accuracy >= 60 ? 'primary' : 'warning'}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align='center'>
                        {isMastered ? (
                          <Chip
                            label={`⭐ ${t('resultsTable.chips.mastered')}`}
                            size='small'
                            color='success'
                          />
                        ) : entry.correct >= 3 ? (
                          <Chip
                            label={`📚 ${t('resultsTable.chips.learning')}`}
                            size='small'
                            color='primary'
                          />
                        ) : (
                          <Chip
                            label={`🎯 ${t('resultsTable.chips.practice')}`}
                            size='small'
                            color='default'
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </Paper>
    </Box>
  );
};
