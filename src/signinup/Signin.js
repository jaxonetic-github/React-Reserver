import React, { useState, useEffect }from 'react';

import * as Realm from "realm-web";
import { useRealmApp } from "../RealmApp";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

const theme = createTheme();
const PasswordAriaLabel = { 'aria-label': 'Password' };
const EmailAriaLabel = { 'aria-label': 'EmailAddress' };
const ErrorAriaLabel = { 'aria-label': 'Error' };
 const submitAriaLabel = { 'aria-label': 'Submit' };

/**
 * Perform Sign-in when user Submits form by 
 * 1. Reads the form data 
 * 2. Attempts to signin with credentials{email, password}.
 * 3. Navigates home on success or displays any errors
 * 
 * @param event: the submit event
 */
export default function SignIn({dispatch}) {
 
 const  app = useRealmApp();
const navigate = useNavigate();
  const [error, setErrorMsg] = React.useState('');
   
/**
 * Performs the registration when user Submits form
 * 
 */
  const handleSubmit = async (event) => {
//clear errors on resubmission
    setErrorMsg(null);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    }
    try {
     const result = await app.logIn(credentials);
     if(result.error){
      setErrorMsg(result.error);
     }else
       if(result.success) navigate('/');
     dispatch && dispatch({type: 'USER_LOGIN_REQUESTED', payload: credentials});
    
    } catch (err) {
      console.log('signin handle submit error',err)
      setErrorMsg(err.toString());
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
            Sign in
          </Typography>
              <Typography component="span" aria-label='Error'  align="center" sx={{color:'red'}}>
    {error}
          </Typography>
          <Box component="form" onSubmit={(event)=>handleSubmit(event)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              inputProps={EmailAriaLabel}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth

              inputProps={PasswordAriaLabel}
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              aria-label="Submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button  href="#" variant="body2">
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={()=>navigate('/signup')} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}