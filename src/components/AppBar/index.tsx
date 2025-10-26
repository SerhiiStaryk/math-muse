import { Link } from 'react-router-dom';
import { AppBar as MuiAppBar, Toolbar, Typography, Button } from '@mui/material';
import { navItems } from '@/constants';

export const AppBar = () => (
  <MuiAppBar
    position='fixed'
    component='nav'
  >
    <Toolbar>
      <Typography
        variant='h6'
        component='div'
        sx={{ flexGrow: 1 }}
      >
        Fun Math Games
      </Typography>
      {navItems.map(item => (
        <Button
          key={item.path}
          color='inherit'
          component={Link}
          to={item.path}
        >
          {item.title}
        </Button>
      ))}
    </Toolbar>
  </MuiAppBar>
);
