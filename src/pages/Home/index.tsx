import { Container } from '@mui/material';
import { GameSection } from '@/components/GameSection';
import { WelcomeSection } from '@/components/WelcomeSection';
import { UtilitiesSection } from '@/components/UtilitiesSection';
import { MotivationalFooter } from '@/components/MotivationalFooter';

export const HomePage = () => (
  <Container maxWidth='lg'>
    <WelcomeSection />
    <GameSection />
    <UtilitiesSection />
    <MotivationalFooter />
  </Container>
);
