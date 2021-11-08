import React, { useState} from 'react';
import { useRealmApp } from "./RealmApp";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {handleAuthenticationError, parseAuthenticationError} from './constants'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

/**
 * Profile : Displays User specific and saved info
 */
export default function Profile(props) {
  const app = useRealmApp();
 const [profile, setProfile] = React.useState(app.profile);


 React.useEffect(() => {
 console.log(props,'   ',app.profile)
 setProfile(app.profile)
  });  

  const [error, setErrorMsg] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    
      try {   
      
        app.currentUser.functions.EditProfile({firstname:data.get('firstName'), lastname:data.get('lastName'), email:data.get('email'), phone:data.get('phone'), userid:app.currentUser.id}).then((userdata)=>{console.log(userdata)});

    } catch (err) {
      const errMsg = handleAuthenticationError(err, setErrorMsg);
      setErrorMsg(errMsg);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
       
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input
                  name="firstName"
                  defaultValue={profile?.firstname}
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
              defaultValue={profile?.lastname}

                  placeholder='Last Name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={profile?.email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  defaultValue={profile?.phone}
                  fullWidth
                  name="phone"
                  label="phone"
                  type="phone"
                  id="phone"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}