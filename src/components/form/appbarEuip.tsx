import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, ExitToApp, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface AppBarProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AppBar: React.FC<AppBarProps> = ({ onMenuClick, searchQuery, onSearchChange }) => {
  const navigate = useNavigate();

  return (
    <MuiAppBar position="fixed" color="primary">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6"></Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Search Input */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={searchQuery}
          onChange={onSearchChange}
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
          <AccountCircle />
        </IconButton>

        <IconButton color="inherit" onClick={() => navigate('/')}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
