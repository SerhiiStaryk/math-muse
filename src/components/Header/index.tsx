import { useState } from 'react';
import { SideBar } from '@/components';
import { Link } from 'react-router-dom';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { navItems } from '@/constants';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  return (
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
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
        </Box>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <SideBar
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />
    </MuiAppBar>
  );
};
