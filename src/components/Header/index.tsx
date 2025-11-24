import { useState, type MouseEvent } from 'react';
import { Logo, SideBar } from '@/components';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { navItems, navGroups } from '@/constants';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => location.pathname === path;
  const isGameActive = () => navGroups[0].items.some(item => isActive(item.path));

  return (
    <MuiAppBar
      position='sticky'
      component='nav'
      elevation={2}
      sx={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 107, 107, 0.95)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 0.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Logo size={40} />
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {t('app.name')}
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navItems.map(item => (
            <Button
              key={item.path}
              color='inherit'
              component={Link}
              to={item.path}
              sx={{
                fontWeight: 600,
                px: 2.5,
                py: 1,
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-2px)',
                },
                '&::after': isActive(item.path)
                  ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: 3,
                      backgroundColor: 'white',
                      borderRadius: '2px 2px 0 0',
                    }
                  : {},
              }}
            >
              {t(item.translationKey)}
            </Button>
          ))}

          {/* Games Dropdown */}
          <Button
            color='inherit'
            onClick={handleMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              fontWeight: 600,
              px: 2.5,
              py: 1,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              backgroundColor: isGameActive() ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-2px)',
              },
              '&::after': isGameActive()
                ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: 3,
                    backgroundColor: 'white',
                    borderRadius: '2px 2px 0 0',
                  }
                : {},
            }}
          >
            {t('nav.games')}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              '& .MuiPaper-root': {
                borderRadius: 2,
                minWidth: 200,
                mt: 1,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}
          >
            {navGroups[0].items.map(item => {
              const Icon = item.icon;
              return (
                <MenuItem
                  key={item.path}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                  selected={isActive(item.path)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText>{t(item.translationKey)}</ListItemText>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>

        <IconButton
          edge='end'
          color='inherit'
          aria-label='open drawer'
          sx={{
            display: { xs: 'flex', md: 'none' },
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'rotate(90deg)',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            },
          }}
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
