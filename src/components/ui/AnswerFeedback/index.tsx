import { motion } from 'framer-motion';
import { Typography, Box } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import { useEffect, useState } from 'react';
import { useSoundEffects } from '@/hooks';
import { useTranslation } from 'react-i18next';

type AnswerFeedbackProps = {
  isCorrect: boolean | null;
};

export const AnswerFeedback = ({ isCorrect }: AnswerFeedbackProps) => {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const [message, setMessage] = useState<string | null>(null);

  const encouragementLevel = settings.encouragementLevel;

  useEffect(() => {
    if (isCorrect === null) {
      setMessage(null);
      return;
    }

    const type = isCorrect ? 'correct' : 'incorrect';
    const messages = t(`encouragement.${type}.${encouragementLevel}`, { returnObjects: true }) as string[];

    if (Array.isArray(messages) && messages.length > 0) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [isCorrect, encouragementLevel, t]);

  useEffect(() => {
    if (isCorrect && settings.enableCelebrations && !settings.reduceMotion) {
      // Simple confetti effect (you can enhance this with a library like canvas-confetti)
      console.log('🎊 Celebration!');
    }
  }, [isCorrect, settings.enableCelebrations, settings.reduceMotion]);

  const { playSound } = useSoundEffects();

  useEffect(() => {
    if (isCorrect !== null && settings.enableSoundEffects) {
      playSound(isCorrect ? 'correct' : 'incorrect');
    }
  }, [isCorrect, settings.enableSoundEffects, playSound]);

  if (isCorrect === null) return null;

  const shouldAnimate = !settings.reduceMotion;

  return (
    <Box
      component={shouldAnimate ? motion.div : 'div'}
      {...(shouldAnimate && {
        initial: { scale: 0, rotate: -10 },
        animate: { scale: 1, rotate: 0 },
        exit: { scale: 0 },
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 15,
        },
      })}
      sx={{ mt: { xs: 1, md: 3 }, textAlign: 'center' }}
    >
      <Typography
        variant={settings.largeText ? 'h3' : 'h5'}
        sx={{
          color: isCorrect ? 'success.main' : 'error.main',
          fontWeight: 700,
          textShadow: settings.highContrast ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};
