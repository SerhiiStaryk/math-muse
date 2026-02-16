import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

export const Layout = () => (
  <>
    <Header />
    <Container
      component='main'
      maxWidth='lg'
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3 },
        flex: 1,
      }}
    >
      <Outlet />
    </Container>
  </>
);
