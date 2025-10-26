import { useState } from 'react';
import { AppBar, SideBar } from '@/components';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  return (
    <>
      <AppBar />
      <SideBar
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />
    </>
  );
};
