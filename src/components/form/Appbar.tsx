import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, InputAdornment, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface AppBarProps {
  toggleDrawer: (open: boolean) => () => void;
}

const CustomAppBar: React.FC<AppBarProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" color='primary'>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">Catalog</Typography>

        <Box sx={{ flexGrow: 1 }} />

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginRight: 2, backgroundColor: 'white', borderRadius: 1 }}
        />

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

export default CustomAppBar;
