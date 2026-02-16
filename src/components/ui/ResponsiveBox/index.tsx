import { Box } from '@mui/material';
import type { ReactNode } from 'react';

export type ResponsiveBoxSize = 'small' | 'medium' | 'large';
export type ResponsiveBoxVariant = 'dashed' | 'solid';

interface ResponsiveBoxProps {
  children: ReactNode;
  size?: ResponsiveBoxSize;
  variant?: ResponsiveBoxVariant;
  highlight?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const SIZE_MAP = {
  small: { xs: 40, sm: 50, md: 80 },
  medium: { xs: 50, sm: 70, md: 100 },
  large: { xs: 60, sm: 90, md: 120 },
} as const;

const FONT_SIZE_MAP = {
  small: { xs: '1rem', sm: '1.25rem', md: '1.75rem' },
  medium: { xs: '1.25rem', sm: '1.5rem', md: '2.5rem' },
  large: { xs: '1.5rem', sm: '2rem', md: '3.5rem' },
} as const;

export const ResponsiveBox = ({
  children,
  size = 'medium',
  variant = 'solid',
  highlight = false,
  color = 'primary',
}: ResponsiveBoxProps) => {
  const dimensions = SIZE_MAP[size];
  const fontSize = FONT_SIZE_MAP[size];

  return (
    <Box
      sx={{
        width: dimensions,
        height: dimensions,
        minWidth: dimensions,
        border: variant === 'dashed' ? '3px dashed' : { xs: '2px solid', md: '3px solid' },
        borderColor: highlight ? `${color}.main` : `${color}.main`,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: highlight ? `${color}.light` : `${color}.light`,
        fontSize,
        fontWeight: 700,
        color: 'white',
        flexShrink: 0,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 2,
        },
      }}
    >
      {children}
    </Box>
  );
};
