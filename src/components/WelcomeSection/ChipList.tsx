import { Stack, Chip } from '@mui/material';

export const ChipList = () => {
  return (
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
  );
};
