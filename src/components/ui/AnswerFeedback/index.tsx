/* eslint-disable quotes */
import { motion } from 'framer-motion';
import { Typography, Box } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import { useEffect, useState } from 'react';

type AnswerFeedbackProps = {
  isCorrect: boolean | null;
};

const ENCOURAGEMENT_MESSAGES = {
  correct: {
    high: [
      'Amazing! 🌟',
      "You're a math star! ⭐",
      'Fantastic work! 🎉',
      "Perfect! You're brilliant! 💫",
      'Wow! Incredible! 🚀',
      "You're on fire! 🔥",
      'Outstanding! 🏆',
      'Super job! 💪',
      "You're a genius! 🧠",
      'Excellent! Keep it up! 🎊',
    ],
    medium: ['Correct! 🎉', 'Great job! ✨', 'Well done! 👍', 'Nice work! 🌟', "That's right! ✓"],
    low: ['Correct! ✓', 'Right! 👍', 'Good! ✓'],
  },
  incorrect: {
    high: [
      "Not quite, but keep trying! You're learning! 💪",
      'Oops! Try again - you can do it! 🌈',
      'Almost there! Give it another go! 🎯',
      "Don't give up! Every mistake helps you learn! 📚",
      "Try again! You're getting better! 🌟",
    ],
    medium: ['Try again! 💭', 'Not quite - give it another shot! 🎯', 'Keep trying! ✨'],
    low: ['Try again ❌', 'Not correct ✗'],
  },
};

export const AnswerFeedback = ({ isCorrect }: AnswerFeedbackProps) => {
  const { settings } = useSettings();
  const [message, setMessage] = useState<string | null>(null);

  const encouragementLevel = settings.encouragementLevel;

  useEffect(() => {
    if (isCorrect === null) {
      setMessage(null);
      return;
    }

    const messages = isCorrect
      ? ENCOURAGEMENT_MESSAGES.correct[encouragementLevel]
      : ENCOURAGEMENT_MESSAGES.incorrect[encouragementLevel];

    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, [isCorrect, encouragementLevel]);

  useEffect(() => {
    if (isCorrect && settings.enableCelebrations && !settings.reduceMotion) {
      // Simple confetti effect (you can enhance this with a library like canvas-confetti)
      console.log('🎊 Celebration!');
    }
  }, [isCorrect, settings.enableCelebrations, settings.reduceMotion]);

  useEffect(() => {
    if (isCorrect !== null && settings.enableSoundEffects) {
      // Play sound effect (you can add actual audio files later)
      console.log(isCorrect ? '🔊 Success sound!' : '🔊 Try again sound!');
    }
  }, [isCorrect, settings.enableSoundEffects]);

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
      sx={{ mt: 3, textAlign: 'center' }}
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
