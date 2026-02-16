import { Typography, Box } from '@mui/material';

type ScoreProps = {
  score: number;
  attempts: number;
};

export const Score = ({ score, attempts }: ScoreProps) => (
  <Box mt={4}>
    <Typography variant='h6'>
      Score: {score} / {attempts}
    </Typography>
  </Box>
);
