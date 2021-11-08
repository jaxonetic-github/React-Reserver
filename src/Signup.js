import React, {useEffect} from 'react';
import * as Realm from "realm-web";
import { useRealmApp } from "./RealmApp";
import {Link as ReactLink, useNavigate} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Signin from './Signin';
import validator from 'validator'
function handleAuthenticationError(err, setError) {
  let returnMsg=null;
  const { status, message } = parseAuthenticationError(err);
  const errorType = message || status;
  console.log(err,'--em--',message,'--s--', status);
  switch (errorType) {
    case "invalid username":
       returnMsg = "Invalid email address." ;
      break;
    case "invalid username/password":
    case "invalid password":
    case "401":

      returnMsg =  "Incorrect password.";
      break;
    case "name already in use":
    case "409":
      setError((err) => ({ ...err, errorMsg: "Email is already registered." }));
      returnMsg = "Email is already registered." ;
      break;
    case "password must be between 6 and 128 characters":
    case "400":
      setError((err) => ({
        ...err,
        errorMsg: "Password must be between 6 and 128 characters."
      }));
      returnMsg = "Password must be between 6 and 128 characters.";
      break;
    default:
    console.log(err);
    returnMsg='See Logs';
      break;
  }
  return returnMsg ;
}

function parseAuthenticationError(err) {
  const parts = err.message.split(":");
  const reason = parts[parts.length - 1].trimStart();
  if (!reason) return { status: "", message: "" };
  const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
  const match = reason.match(reasonRegex);
  const { status, message } = match?.groups ?? {};
  return { status, message };
}
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
  /*const handleRegistrationAndLogin = async (app, email, password, setError) => {
    const isValidEmailAddress = validator.isEmail(email);
    //setError((e) => ({ ...e, password: null }));
    if (isValidEmailAddress) {
      try {
        // Register the user and, if successful, log them in
       await app.registerWithEmail(email, password);
       // const usr =  await app.logIn(Realm.Credentials.emailPassword(email, password));

               console.log(app.currentUser,'usr?????????');


       // const usr =  await app.logIn(Realm.Credentials.emailPassword(email, password));

       return app.currentUser;
      } catch (err) {
        console.log('error in handleregiagraionand login', err);
        handleAuthenticationError(err, setError);
      }
    } else {
      setError((err) => ({ ...err, email: "Email is invalid." }));
    }
  };*/

const theme = createTheme();

export default function SignUp(props) {
  const app = useRealmApp();
    const navigate = useNavigate();

  const [usr, setUser] = React.useState(app.currentUser);
 // app.userWatcher(setUser);

  useEffect(() => {
console.log("SignUp user in Signup Effect. ",app.currentUser);

  });

  const [error, setErrorMsg] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
   
  
      try {
  await app.registerWithEmail(data.get('email'),data.get('password'),data.get('firstName'),data.get('lastName'))

        
    } catch (err) {
      console.log(err,'11submit eror mesg');

      const errMsg = handleAuthenticationError(err, setErrorMsg);
      console.log(err,'submit eror mesg',errMsg);
      setErrorMsg(errMsg);
    }
    navigate('/');
  };
console.log(error);
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
            Sign up
          </Typography>
       
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={()=>navigate('signin')} href="#" variant="body2">
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}