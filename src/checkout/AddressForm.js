import  React from 'react';
import { useSelector } from 'react-redux'

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

import {EmailAriaLabel,PasswordAriaLabel, FirstNameAriaLabel, LastNameAriaLabel,
  PickUpDateAriaLabel, PickUpLocationAriaLabel,DropOffLocationAriaLabel,DropOffDateAriaLabel }  from '../constants'


export default function AddressForm(props) {

  const currentUser = useSelector((state)=>state?.profile);

const isPasswdNeeded = (currentUser?.email==null);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Pick up Date
      </Typography>
      <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
          <TextField
            onChange = {props.onChange}
            inputProps={PickUpDateAriaLabel}
        name="pickupdate"
        id="pickupdate"
        label="Choose a pick up date"
       type="datetime-local"
         defaultValue="2021-11-21T11:30"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}/>        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange = {props.onChange}
            required
            inputProps={PickUpLocationAriaLabel}
            id="pickup-location"
            name="pickupLocation"
            label="Pick Up Location"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          inputProps={DropOffDateAriaLabel}
          onChange = {props.onChange}
          name='dropoffDate'
        id="dropoffdate"
        label="Choose a drop off date"
       type="datetime-local"
         defaultValue="2021-11-21T11:30"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}/>        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
          inputProps={DropOffLocationAriaLabel}
          onChange = {props.onChange}
            id="dropoff-location"
            name="dropoffLocation"
            label="Drop off Location"
            fullWidth
            variant="standard"
          />
        </Grid>
     <Grid item xs={12} sm={6}>
                <Input
                  name="firstName"
                 placeholder='First Name'
onChange = {props.onChange}
                  fullWidth
                  id="firstName"
                  inputProps={FirstNameAriaLabel}
                  label="First Name"
                  defaultValue={currentUser?.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  inputProps={LastNameAriaLabel}
                  placeholder='Last Name'
                   defaultValue={currentUser?.lastname}
onChange = {props.onChange}
                />
              </Grid>
       <Grid item xs={12} sm={6}>
                <Input
                  name="email"
                  onChange = {props.onChange}
                 placeholder='email'
                  defaultValue={currentUser?.email}
                  inputProps={EmailAriaLabel}
                  fullWidth
                  id="email"
                  label="Email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                onChange = {props.onChange}
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
               defaultValue={currentUser?.phone}

                  placeholder='Contact #'
                />
              </Grid>

 {isPasswdNeeded && <Grid item xs={12}>
                 <Grid item xs={6} sm={6}>
                 <TextField 
              margin="normal"
              required
              fullWidth
              onChange = {props.onChange}
              name="password"
              label="Password"
              inputProps={PasswordAriaLabel}
              type="password"
              id="password"
              autoComplete="current-password"
            />
              </Grid>
        </Grid>  }

      </Grid>
    </React.Fragment>
  );
}
