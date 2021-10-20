import * as React from 'react';
import { withRouter } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Navigation = ({history}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(null);
    console.log(event.currentTarget.innerText)
    history.push(`/${event.currentTarget.innerText.toLowerCase()}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <div>
              <IconButton
                size="large"
                aria-label="user settings menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={(event)=>handleClick(event)}>Home</MenuItem>
                <MenuItem onClick={(event)=>handleClick(event)}>Metrics</MenuItem>
                <MenuItem onClick={(event)=>handleClick(event)}>Logs</MenuItem>
              </Menu>
            </div>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default withRouter(Navigation);