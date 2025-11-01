import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [message, setMessage] = useState('');
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    setMessage('You have logged out of your profile!');
    navigate('/auth');
  };

  const [mode, setMode] = React.useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = React.useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Collection
          </Typography>

          {user && (
            <Button onClick={handleLogout} size="small" color="black" variant="outlined">
              Logout
            </Button>
          )}

          <IconButton size="large" color="inherit" onClick={toggleTheme}>
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>

          <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>

          <Menu id="menu-appbar" anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
            {!user || user.role !== 'admin' ? null : (
              <MenuItem onClick={() => handleClose('/admin-panel')}>Admin Page</MenuItem>
            )}
            <MenuItem onClick={() => handleClose('/dashboard')}>Dashboard</MenuItem>
            <MenuItem onClick={() => handleClose('/my-page')}>My Page</MenuItem>
            {user && <MenuItem onClick={() => handleClose('/inventories')}>Inventories</MenuItem>}
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
