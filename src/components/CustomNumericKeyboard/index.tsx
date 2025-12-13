import { Box, Button, Grid } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveIcon from '@mui/icons-material/Remove';

type CustomNumericKeyboardProps = {
  onInput: (value: number) => void;
  onBackspace: () => void;
  onSubmit?: () => void;
  onToggleSign?: () => void;
  disabled?: boolean;
};

export const CustomNumericKeyboard = ({
  onInput,
  onBackspace,
  onSubmit,
  onToggleSign,
  disabled = false,
}: CustomNumericKeyboardProps) => {
  const handleNumberClick = (num: number) => {
    if (!disabled) {
      onInput(num);
    }
  };

  const buttonSx = {
    height: { xs: 60, sm: 70 },
    borderRadius: 3,
    fontSize: { xs: '1.5rem', sm: '2rem' },
    fontWeight: 'bold',
    boxShadow: '0 4px 0 rgba(0,0,0,0.1)',
    transition: 'all 0.1s active',
    '&:active': {
      boxShadow: '0 2px 0 rgba(0,0,0,0.1)',
      transform: 'translateY(2px)',
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Grid container spacing={1}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <Grid size={{ xs: 4 }} key={num}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={() => handleNumberClick(num)}
              disabled={disabled}
              sx={{
                ...buttonSx,
                bgcolor: 'background.default', // Use lighter background for numbers
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              {num}
            </Button>
          </Grid>
        ))}

        {/* Row 4: Minus, 0, Backspace */}
        <Grid size={{ xs: 4 }}>
          <Button
            fullWidth
            variant='contained'
            color='secondary' // Distinctive color for Minus
            onClick={onToggleSign}
            disabled={disabled || !onToggleSign}
            sx={{
              ...buttonSx,
              bgcolor: 'secondary.light',
              color: 'secondary.contrastText',
              '&:hover': {
                bgcolor: 'secondary.main',
              },
            }}
          >
            <RemoveIcon sx={{ fontSize: '1.5em' }} />
          </Button>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={() => handleNumberClick(0)}
            disabled={disabled}
            sx={{
              ...buttonSx,
              bgcolor: 'background.default',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            0
          </Button>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Button
            fullWidth
            variant='contained'
            color='error'
            onClick={onBackspace}
            disabled={disabled}
            sx={{
              ...buttonSx,
              bgcolor: 'error.light',
              color: 'error.contrastText',
              '&:hover': {
                bgcolor: 'error.main',
              },
            }}
          >
            <BackspaceIcon sx={{ fontSize: '1.5em' }} />
          </Button>
        </Grid>

        {/* Row 5: Submit (Full Width) */}
        {onSubmit && (
          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              variant='contained'
              color='success'
              onClick={onSubmit}
              disabled={disabled}
              sx={{
                ...buttonSx,
                backgroundColor: 'success.main',
                color: 'success.contrastText',
                '&:hover': {
                  backgroundColor: 'success.dark',
                },
                mt: 1, // Add a little margin top to separate from keypad
              }}
            >
              <CheckCircleIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
