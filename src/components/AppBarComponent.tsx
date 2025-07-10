// AppBarComponent.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

interface AppBarComponentProps {
  toggleDrawer: (open: boolean) => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Catalog</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={() => navigate('/profile')}>
          <AccountCircleIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/')}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
