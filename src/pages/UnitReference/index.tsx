import { Box, Card, CardContent, Typography, Container, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { UNIT_REFERENCE_DATA } from '@/constants/unitReference';

export const UnitReferencePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container
      maxWidth='lg'
      sx={{ py: 4 }}
    >
      <Box
        mb={4}
        textAlign='center'
      >
        <Typography
          variant='h3'
          component='h1'
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          {t('units.referenceTitle')}
        </Typography>

        <Typography
          variant='h6'
          color='text.secondary'
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          {t('units.referenceSubtitle')}
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
      >
        {UNIT_REFERENCE_DATA.map((category, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
                borderRadius: 4,
                overflow: 'visible',
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  mb={2}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: `${theme.palette.primary.light}20`,
                    color: theme.palette.primary.main,
                    fontSize: '2rem',
                    mx: 'auto',
                  }}
                >
                  {category.icon}
                </Box>

                <Typography
                  variant='h5'
                  component='h2'
                  gutterBottom
                  textAlign='center'
                  sx={{ fontWeight: 'bold' }}
                >
                  {t(category.title)}
                </Typography>

                <Box mt={2}>
                  {category.rules.map((rule, ruleIndex) => (
                    <Box
                      key={ruleIndex}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1.5,
                        borderBottom:
                          ruleIndex < category.rules.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                      }}
                    >
                      <Typography
                        variant='h6'
                        sx={{ fontWeight: 500 }}
                      >
                        {rule.left}
                      </Typography>

                      <Typography
                        variant='h6'
                        color='text.secondary'
                        sx={{ mx: 1 }}
                      >
                        =
                      </Typography>

                      <Typography
                        variant='h6'
                        color='primary.main'
                        sx={{ fontWeight: 700 }}
                      >
                        {rule.right}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
