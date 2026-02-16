import { Container } from '@mui/material';
import { GameSection, WelcomeSection, UtilitiesSection, MotivationalFooter } from '@/components';

export const HomePage = () => (
  <Container maxWidth='lg'>
    <WelcomeSection />
    <GameSection />
    <UtilitiesSection />
    <MotivationalFooter />
  </Container>
);
