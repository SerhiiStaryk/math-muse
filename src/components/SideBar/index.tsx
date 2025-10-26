import { navItems } from '@/constants';
import { Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

type SideBarProps = {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
};

export const SideBar = ({ mobileOpen, onDrawerToggle }: SideBarProps) => {
  const drawer = (
    <Box
      onClick={onDrawerToggle}
      sx={{ textAlign: 'center' }}
    >
      <Typography
        variant='h6'
        sx={{ my: 2 }}
      >
        MUI
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
  );

  return (
    <nav>
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
};
