import { navItems } from '@/constants';
import { Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

type SideBarProps = {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
};

export const SideBar = ({ mobileOpen, onDrawerToggle }: SideBarProps) => {
  return (
    <Drawer
      open={mobileOpen}
      onClose={onDrawerToggle}
      sx={{ minWidth: 250 }}
      anchor='right'
    >
      <Box
        onClick={onDrawerToggle}
        sx={{ textAlign: 'center', minWidth: drawerWidth }}
      >
        <Typography
          variant='h6'
          sx={{ my: 2 }}
        >
          Fun Math Games
        </Typography>
        <Divider />
        <List>
          {navItems.map(item => (
            <ListItem
              key={item.path}
              disablePadding
            >
              <ListItemButton
                component={Link}
                sx={{ textAlign: 'center' }}
                to={item.path}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
