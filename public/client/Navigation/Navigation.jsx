import * as React from 'react';
import { withRouter } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Paper from '@mui/material/Paper';
import Image from 'material-ui-image'
//import img from '../assets/cat.jpeg'


const Navigation = ({history}) => {
  //const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    //setAnchorEl(null);
    history.push(`/${event.currentTarget.innerText.toLowerCase()}`);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem onClick={handleClick} button key={'Home'}>
            <ListItemIcon>
               <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>

          <ListItem onClick={handleClick} button key={'Metrics'}>
            <ListItemIcon>
               <TimelineIcon/>
            </ListItemIcon>
            <ListItemText primary={'Metrics'} />
          </ListItem>

          <ListItem onClick={handleClick} button key={'Logs'}>
            <ListItemIcon>
               <LibraryBooksIcon/>
            </ListItemIcon>
            <ListItemText primary={'Logs'} />
          </ListItem>
        
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box id="appBarBox" sx={{ flexGrow: 1, backgroundColor: 'rgba(69,172,120,0.52)',borderRadius:4}}>
      <AppBar style={{backgroundColor: 'rgba(69,172,120,0.52)',borderRadius:4}} position="static">
        <Toolbar style={{display:'flex',justifyContent:'center'}}>
            <div>
            {/* <div> */}
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{color:'white'}} onClick={toggleDrawer(anchor, true)}>Menu</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
        </Toolbar>
      </AppBar>
     
    </Box>
    
  );
}
export default withRouter(Navigation);