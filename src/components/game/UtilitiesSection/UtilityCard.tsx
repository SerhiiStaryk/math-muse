import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import type { CardType } from '@/types';

type UtilityCardProps = {
  card: CardType;
};

export const UtilityCard = ({ card }: UtilityCardProps) => {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <Grid
      size={{
        xs: 12,
        sm: 6,
        md: 4,
      }}
      key={card.path}
    >
      <Card
        component={RouterLink}
        to={card.path}
        sx={{
          height: '100%',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: settings.reduceMotion ? 'none' : 'translateY(-4px)',
            boxShadow: `0px 8px 24px ${card.color}40`,
          },
        }}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, py: 3 }}>
          <Box
            sx={{
              fontSize: settings.largeText ? '4rem' : '3.5rem',
              flexShrink: 0,
            }}
          >
            {card.emoji}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant={settings.largeText ? 'h5' : 'h6'}
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              {t(card.title)}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
            >
              {t(card.description)}
            </Typography>
          </Box>
          <Typography
            variant='h4'
            color='text.disabled'
          >
            →
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
