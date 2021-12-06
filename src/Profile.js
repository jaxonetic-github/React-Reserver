import React from 'react';
import {  useSelector, useDispatch } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {PhoneAriaLabel, FirstNameAriaLabel, LastNameAriaLabel, EmailAriaLabel} from './constants'
import validator from 'validator';
import { useNavigate} from "react-router-dom";



const theme = createTheme();

/**
 * Profile : Displays User specific and saved info
 */
function Profile(props) {
    const navigate = useNavigate();
    const profile = useSelector((state)=>state?.profile);

  const  dispatch = useDispatch();

  React.useEffect(() => {
     if(!profile) {console.log('User with no Profile logged in; so, forcing home redirect.'); navigate("/");}
  },[profile,navigate]);

   

 
 const [firstName] = React.useState(profile?.firstname);
  const [lastName] = React.useState(profile?.lastname);
  const [email] = React.useState(profile?.email||'');
  const [phone, setPhone] = React.useState(profile?.phone||'');

  const [error] = React.useState('');



   function itineraryValidated  (){
    let validated = false;
         const phoneValidated = phone && validator.isMobilePhone(phone);
         const emailValidated = email && validator.isEmail(email);
        
         const firstNameValidated = firstName && !validator.isEmpty(firstName);
         const lastNameValidated = lastName && !validator.isEmpty(lastName);
           validated = (phoneValidated && emailValidated  && firstNameValidated && lastNameValidated);
             return validated;
}


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch({firstname:data.get('firstName'), lastname:data.get('lastName'), email:data.get('email'), phone:data.get('phone')});

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
       {error}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input
                  name="firstName"
                  defaultValue={firstName}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  inputProps={FirstNameAriaLabel}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
              defaultValue={lastName}
                  inputProps={LastNameAriaLabel}
                  placeholder='Last Name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputProps={EmailAriaLabel}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  defaultValue={phone||''}
                  fullWidth
                  name="phone"
                  label="phone"
                  inputProps={PhoneAriaLabel}
                  type="phone"
                  id="phone"
                  onChange={(event)=>setPhone(event.target.value)}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!itineraryValidated()}
            >
              Edit
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Profile;