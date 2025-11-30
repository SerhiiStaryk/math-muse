import { Box, Typography } from '@mui/material';

import { useSettings } from '@/context/SettingsContext';

export const MotivationalFooter = () => {
  const { settings } = useSettings();

  return (
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
  );
};
