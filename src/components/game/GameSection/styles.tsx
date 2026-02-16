import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import type { CardProps } from '@mui/material/Card';
import { Link as RouterLink } from 'react-router-dom';

interface StyledCardProps {
  game: { color: string };
  settings: { reduceMotion: boolean };
}

type CombinedProps = CardProps<typeof RouterLink> & StyledCardProps;

export const StyledCard = styled(Card)<CombinedProps>(({ game, settings }) => ({
  height: '100%',
  textDecoration: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',

  '&:hover': {
    transform: settings.reduceMotion ? 'none' : 'translateY(-8px) scale(1.02)',
    boxShadow: `0px 12px 40px ${game.color}40`,
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: game.color,
  },
}));
