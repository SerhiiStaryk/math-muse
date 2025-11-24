import { Box } from '@mui/material';
import logo from '/logo192.png';

interface LogoProps {
  size?: number;
}

export const Logo = ({ size = 120 }: LogoProps) => {
  return (
    <Box
      component='img'
      src={logo}
      alt='Math Muse Logo'
      sx={{ width: size, height: size }}
    />
  );
};
