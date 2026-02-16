import { Chip } from '@mui/material';
import { StyledChipContainer } from './styles';
import { CHIP_DATA } from './constants';
import { useTranslation } from 'react-i18next';

export const ChipList = () => {
  const { t } = useTranslation();

  return (
    <StyledChipContainer>
      {CHIP_DATA.map(chip => (
        <Chip
          key={chip.label}
          label={`${chip.icon} ${t(chip.label)}`}
          color={chip.color as 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'}
        />
      ))}
    </StyledChipContainer>
  );
};
