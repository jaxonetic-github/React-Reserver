import  React, {useEffect} from 'react';
import { useRealmApp } from "../RealmApp";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';


export default function AddressForm(props) {
const app = useRealmApp();

const isPasswdNeeded = (app.currentUser?.customData?.email==null);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Pick up Date
      </Typography>
      <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
          <TextField
            onChange = {props.onChange}
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
            id="pickup-location"
            name="pickupLocation"
            label="Pick Up Location"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
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
                  label="First Name"
                  defaultValue={app?.currentUser?.customData?.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  placeholder='Last Name'
                   defaultValue={app?.currentUser?.customData?.lastname}
onChange = {props.onChange}
                />
              </Grid>
       <Grid item xs={12} sm={6}>
                <Input
                  name="email"
                  onChange = {props.onChange}
                 placeholder='email'
                  defaultValue={app?.currentUser?.customData?.email}

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
               defaultValue={app?.currentUser?.customData?.phone}

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
