import { Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

export const Layout = () => (
  <>
    <Header />
    <Container
      component='main'
      maxWidth='lg'
      sx={{ py: 4, flex: 1 }}
    >
      <Toolbar />
      <Outlet />
    </Container>
  </>
);
