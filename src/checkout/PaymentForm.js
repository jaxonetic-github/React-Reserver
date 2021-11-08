import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/core/TextareaAutosize';

const Agreements = "As a Business person, I take pride and dignity in my vehicles and service.  The vehicle is thoroughly cleaned inside and out because I value your image and health.\n\nPlease check the vehicle principle guidleins thoroughly with the agent at the lot before taking the vehicle./n/nSmoking of any kind is prohibited in the vehicle.  You will be financially responsible for any physical damage or smoking damage.  Please treat this vehicle as your own vehicle.\n\nPlease be aware there is a camera within this vehicle.  8 Angels monitors all their vehicles through tracking devices and cameras during the customer's reservation.  Again please follow the vehicle guidelines and enjoy your rental."

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Agreements
      </Typography>
      <TextareaAutosize
  aria-label="minimum height"
  minRows={3}
  placeholder="Minimum 3 rows"
  style={{ width: 400 }}
  value={Agreements}
/>
      <Grid container spacing={3}>
              <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Please check if you agree to the terms above"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
             helperText="Please sign to agree to the terms above"

          />
        </Grid>
        

      </Grid>
    </React.Fragment>
  );
}
