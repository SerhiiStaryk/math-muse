import { useCallback } from 'react';
import { useSettings } from '@/context/SettingsContext';

const SOUNDS = {
  correct: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  incorrect: 'https://assets.mixkit.co/active_storage/sfx/123/123-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  complete: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
};

export const useSoundEffects = () => {
  const { settings } = useSettings();

  const playSound = useCallback(
    async (type: keyof typeof SOUNDS) => {
      if (!settings.enableSoundEffects) return;

      try {
        const audio = new Audio(SOUNDS[type]);
        audio.volume = 0.5;
        await audio.play();
      } catch (error) {
        console.warn('Failed to play sound:', error);
      }
    },
    [settings.enableSoundEffects]
  );

  return { playSound };
};
