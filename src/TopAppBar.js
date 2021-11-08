import React, {  useEffect }from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SignInDialogue from './SignInDialogue';
import ReservationDialog from './ReservationMgr';

import ProfileDialog from './ProfileDialog';
import { useRealmApp } from "./RealmApp";




const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : null;
};

export default function PrimarySearchAppBar(props) {
  const app = useRealmApp();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    
    // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <RequireLoggedInUser>
<Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem ><ProfileDialog/></MenuItem>
      <MenuItem onClick={handleMenuClose}><ReservationDialog/></MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign-out</MenuItem>
    </Menu></RequireLoggedInUser> 
  );
  
      const logout = (app.currentUser? <Button variant="outlined" onClick={()=>{app.logOut(); app.currentUser=null; }}>Logout</Button> :
      <SignInDialogue/> ) ;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"  sx={{  bgcolor: 'background.default' }}>
        <Toolbar>
         
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color:'black' }}
          >
           8 Angels Transportation
          </Typography>
   
          <Box sx={{ flexGrow: 1 }} />

{logout}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           <RequireLoggedInUser>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon sx={{ color: 'darkgray' }}/>
            </IconButton>
            </RequireLoggedInUser>
          </Box>
          
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}
