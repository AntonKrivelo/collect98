import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    if (path) {
      navigate(path);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Collection
          </Typography>
          <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
            <MenuItem onClick={() => handleClose('/register')}>Register</MenuItem>
            <MenuItem onClick={() => handleClose('/login')}>Login up</MenuItem>
            <MenuItem onClick={() => handleClose('/admin')}>Admin Panel</MenuItem>
            <MenuItem onClick={() => handleClose('/inventories')}>Inventories</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}
