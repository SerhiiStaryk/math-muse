import { navItems, navGroups } from '@/constants';
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Collapse,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

type SideBarProps = {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
};

export const SideBar = ({ mobileOpen, onDrawerToggle }: SideBarProps) => {
  const [gamesOpen, setGamesOpen] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  const handleGamesClick = () => {
    setGamesOpen(!gamesOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Drawer
      open={mobileOpen}
      onClose={onDrawerToggle}
      sx={{ minWidth: 250 }}
      anchor='right'
    >
      <Box sx={{ textAlign: 'center', minWidth: drawerWidth }}>
        <Typography
          variant='h6'
          sx={{ my: 2, fontWeight: 700, color: 'primary.main' }}
        >
          {t('app.name')}
        </Typography>
        <Divider />
        <List>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <ListItem
                key={item.path}
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={onDrawerToggle}
                  selected={isActive(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Icon color={isActive(item.path) ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText primary={t(item.translationKey)} />
                </ListItemButton>
              </ListItem>
            );
          })}

          <Divider sx={{ my: 1 }} />

          {/* Games Group */}
          {navGroups.map(group => {
            const GroupIcon = group.icon;
            return (
              <Box key={group.title}>
                <ListItemButton onClick={handleGamesClick}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <GroupIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    primary={t(group.translationKey)}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                  {gamesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={gamesOpen}
                  timeout='auto'
                  unmountOnExit
                >
                  <List
                    component='div'
                    disablePadding
                  >
                    {group.items.map(item => {
                      const Icon = item.icon;
                      return (
                        <ListItem
                          key={item.path}
                          disablePadding
                        >
                          <ListItemButton
                            component={Link}
                            to={item.path}
                            onClick={onDrawerToggle}
                            selected={isActive(item.path)}
                            sx={{
                              pl: 4,
                              '&.Mui-selected': {
                                backgroundColor: 'primary.light',
                                '&:hover': {
                                  backgroundColor: 'primary.main',
                                },
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <Icon color={isActive(item.path) ? 'primary' : 'inherit'} />
                            </ListItemIcon>
                            <ListItemText primary={t(item.translationKey)} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};
