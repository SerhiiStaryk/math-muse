import { Box, IconButton, Drawer } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { GameProgress } from '../../game';

interface MobileGameLayoutProps {
  children: ReactNode;
  correctCount: number;
  totalCount: number;
  streak?: number;
}

export const MobileGameLayout = ({ children, correctCount, totalCount, streak = 0 }: MobileGameLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box
      sx={{
        // Ізолювати overflow control тільки для ігор
        position: { xs: 'fixed', md: 'static' },
        top: { xs: 56, md: 'auto' }, // Висота Header
        left: { xs: 0, md: 'auto' },
        right: { xs: 0, md: 'auto' },
        bottom: { xs: 0, md: 'auto' },
        height: {
          xs: 'calc(100vh - 56px)', // Viewport height мінус Header
          md: 'auto',
        },
        display: 'flex',
        flexDirection: 'column',
        overflow: { xs: 'hidden', md: 'visible' },
        zIndex: { xs: 1, md: 'auto' },
      }}
    >
      {/* Progress Toggle Button (Mobile Only) */}
      <IconButton
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: 'background.paper',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: 'background.paper',
          },
        }}
        onClick={() => setDrawerOpen(true)}
        size='small'
      >
        <BarChartIcon />
      </IconButton>

      {/* Game Content Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: { xs: 'auto', md: 'visible' },
          overflowX: 'hidden',
          px: { xs: 2, sm: 2, md: 3 }, // 16px, як в MissingNumber
          py: { xs: 3, sm: 4 }, // 24px, щоб картка не була занадто високою
        }}
      >
        {children}
      </Box>

      {/* Progress Drawer (Mobile) */}
      <Drawer
        anchor='bottom'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '40vh',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <GameProgress
            correctCount={correctCount}
            totalCount={totalCount}
            streak={streak}
          />
        </Box>
      </Drawer>

      {/* Progress Inline (Desktop) */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <GameProgress
          correctCount={correctCount}
          totalCount={totalCount}
          streak={streak}
        />
      </Box>
    </Box>
  );
};
