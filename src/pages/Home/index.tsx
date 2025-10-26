import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { navItems } from '@/constants';

export const HomePage = () => (
  <Box textAlign='center'>
    <Typography
      variant='h3'
      gutterBottom
      color='primary'
    >
      Welcome!
    </Typography>
    <Typography
      variant='h6'
      gutterBottom
    >
      Play colorful games to learn math.
    </Typography>
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        mt: 3,
        flexWrap: 'wrap',
      }}
    >
      {navItems.map(item => (
        <Button
          variant='contained'
          color='primary'
          size='large'
          component={RouterLink}
          to={item.path}
        >
          {item.title}
        </Button>
      ))}
    </Box>
  </Box>
);
