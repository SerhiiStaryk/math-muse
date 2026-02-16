import { Box } from '@mui/material';
import logo from '/logo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledLogoContainer, StyledLogoText } from './styles';

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
      <StyledLogoContainer>
        <Box
          component='img'
          src={logo}
          alt='Math Muse Logo'
          sx={{ width: size, height: size }}
        />
        <StyledLogoText
          variant='h6'
          noWrap
        >
          {t('app.name')}
        </StyledLogoText>
      </StyledLogoContainer>
    </Link>
  );
};
