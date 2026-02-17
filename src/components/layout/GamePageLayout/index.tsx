import { Box, Typography, Stack, Chip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';
import { QuestionCard, IncorrectAnswerDialog, SessionCompleteDialog } from '../../game';
import { MobileGameLayout } from '../MobileGameLayout';
import { useGameSession } from '@/hooks';

interface GamePageLayoutProps {
  title: string;
  session: ReturnType<typeof useGameSession>;
}

export const GamePageLayout = ({ title, session }: GamePageLayoutProps) => {
  const { t } = useTranslation();
  const {
    correctCount,
    totalCount,
    streak,
    question,
    isCorrect,
    useMultipleChoice,
    sessionComplete,
    showPopup,
    correctAnswer,
    handleAnswer,
    handleClosePopup,
    handleResetSession,
  } = session;

  return (
    <MobileGameLayout
      correctCount={correctCount}
      totalCount={totalCount}
      streak={streak}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: { xs: 'hidden', md: 'visible' },
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{
            mb: { xs: 1, sm: 2 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          }}
        >
          {title}
        </Typography>

        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ mb: { xs: 2, sm: 4 } }}
        >
          <Chip
            icon={<HelpOutlineIcon />}
            label={`${t('common.score')}: ${correctCount}`}
            color='primary'
            variant='outlined'
          />
          <Chip
            label={`${t('common.streak')}: ${streak} 🔥`}
            color='warning'
            variant={streak > 0 ? 'filled' : 'outlined'}
          />
        </Stack>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: { xs: 'hidden', md: 'visible' },
          }}
        >
          <QuestionCard
            question={question.question}
            answers={question.answers}
            isCorrect={isCorrect}
            onAnswer={handleAnswer}
            useMultipleChoice={useMultipleChoice}
          />
        </Box>

        <IncorrectAnswerDialog
          open={showPopup}
          correctAnswer={correctAnswer}
          onClose={handleClosePopup}
        />

        <SessionCompleteDialog
          correctCount={correctCount}
          totalCount={totalCount}
          streak={streak}
          sessionComplete={sessionComplete}
          handleResetSession={handleResetSession}
        />
      </Box>
    </MobileGameLayout>
  );
};
