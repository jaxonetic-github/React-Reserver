import React, {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';

import ProfileDialog from './ProfileDialog';
import SignInDialogue from './SignInDialogue';
import { useRealmApp } from "./RealmApp";
import {Link, useNavigate} from "react-router-dom";

require('./css/appbarr.css'); 
/**
 * Main Application Bar with menus
 */
export default function MenuAppBar(props) {
  const app = useRealmApp();
  const navigate = useNavigate();
  
  const [auth, setAuth] = React.useState(app.profile);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

React.useEffect(() => {
console.log(app.profile);
  if(app.profile)
  {
    setAuth(app.profile)
      /* console.log(app.currentUser,"realm effect user >>>",props);
          setAuth(app?.currentUser?.customData);
*/
  }});

  return (
    <Box sx={{ flexGrow: 1 }}>
 
      <AppBar position="fixed"  sx={{  bgcolor: '#605757' }}>
        <Toolbar >
        <Grid container spacing={3}>
  <Grid item xs={1}>
     
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 4, color:'white' }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          
  </Grid>
  <Grid item xs={10}>
    <Box align='center'  ><Typography component="div"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
         >
            8 Angels Transportation
          </Typography>
          </Box>
          
  </Grid>

</Grid>
      { (auth) ?   <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{handleClose(); navigate('/');}}><HomeIcon/>Home</MenuItem>
          
                <MenuItem onClick={()=>{handleClose(); navigate('profile');}}><AccountCircle />Profile</MenuItem>
                <MenuItem onClick={()=>{handleClose(); navigate('/reservations');}}><AssignmentIcon />Reservations</MenuItem>
                <MenuItem onClick={()=>{handleClose(); app.logOut(); setAuth(false); navigate('/');}}>Logout</MenuItem>
              </Menu>
               :<Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{handleClose(); navigate('/');}}><HomeIcon/>Home</MenuItem>
                  <MenuItem onClick={()=>{handleClose();  navigate('signin');}}>SignIn</MenuItem>
               
              </Menu>
      }
      
         
            
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}
