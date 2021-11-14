import React  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';

import { useRealmApp } from "../RealmApp";
import { useNavigate} from "react-router-dom";

require('../css/appbarr.css'); 
/**
 * Main Application Bar with menus
 */
export default function MenuAppBar() {
  const app = useRealmApp();
  const navigate = useNavigate();
   
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



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
          sx={{fontFamily: "cursive",fontWeight: 650}}
         >
            8Angels Transportation
          </Typography>
          </Box>
          
  </Grid>

</Grid>
      { (app?.currentUser?.customData?.email) ?   <Menu
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
                <MenuItem onClick={()=>{handleClose(); app.logOut();  navigate('/');}}>Logout</MenuItem>
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
      
         
            
         {app?.currentUser?.customData?.firstname ? `Hello,${app?.currentUser?.customData?.firstname}` : ''}
        </Toolbar>

      </AppBar>
    </Box>
  );
}
