import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
  {
    name: 'Reservation Fee',
    desc: 'Due by Pickup : Flat fee',
    price: '$150.00',
  },
  {
    name: 'Hourly adjustments',
    desc: 'ex. $20 hour after 3 hours',
    price: '$3.45',
  },
  {
    name: 'Mileage adjustments',
    desc: 'ex. $3/mi after 150 miles',
    price: '$3.00/mi',
  },
  {
    name: 'Security Deposit',
    desc: '',
    price: '$100.00',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: null },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review(props) {
  console.log(props);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Itinerary
          </Typography>
          <Typography gutterBottom>{props.reservation.firstName} {props.reservation.lastName}</Typography>
          <Typography gutterBottom>{props.reservation.pickupLocation}</Typography>
          <Typography gutterBottom>{props.reservation.pickupLocation}{new Date(props.reservation.pickupLocation).toLocaleString()}</Typography>
          <Typography gutterBottom>{props.reservation.dropOffLocation}{new Date(props.reservation.dropOffDate).toLocaleString()}</Typography>                    
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail?payment.detail:(props.reservation.firstName+props.reservation.lastName)}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
