import { Box, Typography } from '@mui/material';
import logo from '/logo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LogoProps {
  size?: number;
}

export const Logo = ({ size = 120 }: LogoProps) => {
  const { t } = useTranslation();

  return (
    <Link
      to='/math-muse'
      style={{ textDecoration: 'none' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer',
          },
        }}
      >
        <Box
          component='img'
          src={logo}
          alt='Math Muse Logo'
          sx={{ width: size, height: size }}
        />
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{
            fontWeight: 700,
            letterSpacing: 0.5,
            textDecoration: 'none',
            color: 'primary.contrastText',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {t('app.name')}
        </Typography>
      </Box>
    </Link>
  );
};
