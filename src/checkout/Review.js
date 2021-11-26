import * as React from 'react';

//import { ApiError, Client, Environment,square } from 'square'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { FEE_FORMULA } from '../constants';
import TextField from '@mui/material/TextField';

import  {SquarePaymentsForm,  CreditCardInput} from 'react-square-web-payments-sdk';

 
/**
 * import  {SquarePaymentsForm,CreditCardInput,} from 'react-square-web-payments-sdk';
 * 
 * For the moment, use an npm module to handle Square Access, because of the pre-made 
 * Form,Validation, Submission
 * 
 */
const MyPaymentForm = ({handleSuccess}) => (
  <SquarePaymentsForm
    /**
     * Identifies the calling form with a verified application ID
     * generated from the Square Application Dashboard.
     */
    applicationId={process.env.REACT_APP_SQUARE_APPID}
    /**
     * Invoked when payment form receives the result of a tokenize generation request.
     * The result will be a valid credit card or wallet token, or an error.
     */
    cardTokenizeResponseReceived={(token, buyer) =>  handleSuccess(token, buyer) }
    
    /**
     * This function enable the Strong Customer Authentication (SCA) flow
     *
     * We strongly recommend use this function to verify the buyer and
     * reduce the chance of fraudulent transactions.
     */
    createVerificationDetails={() => ({
      amount: '1.00',
      /* collected from the buyer */
      billingContact: {
        addressLines: ['123 Main Street', 'Apartment 1'],
        familyName: 'Doe',
        givenName: 'John',
        countryCode: 'US',
        city: 'London',
      },
      currencyCode: 'USD',
      intent: 'CHARGE',
    })}
    /**
     * Identifies the location of the merchant that is taking the payment.
     * Obtained from the Square Application Dashboard - Locations tab.
     */
    locationId={process.env.REACT_APP_SQUARE_LOCATIONID}
  >
    <CreditCardInput />
  </SquarePaymentsForm>
);

/**
* Review component is the final stage of the Reservation process where the user can
* view the details of the desired reservation  and finalize with payment
*
* @param props : 
*     props.reservation   - expects a Reservation javascript object {} used to fill component data
*     props.handleSuccess - expects a callback upon succesful submission of credit card info 
*/
export default function Review(props) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {FEE_FORMULA.map((product) => (
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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={10}>
          <Typography variant="h6" gutterBottom >
            Itinerary
          </Typography>
          <Typography gutterBottom>{'Contact : '}{props.reservation.firstName} {props.reservation.lastName}</Typography>
          <Typography gutterBottom>{'Pick-up : '}{props.reservation.pickupLocation}{new Date(props.reservation.pickupDate).toLocaleString()}</Typography>
          <Typography gutterBottom>{'Drop-off : '}{props.reservation.dropOffLocation}{new Date(props.reservation.dropOffDate).toLocaleString()}</Typography>                    
        </Grid>
      </Grid>

       <Typography variant="h6" gutterBottom>
        Secure Payment
      </Typography>
      <Divider />
       <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>

  < MyPaymentForm handleSuccess={props.handleSuccess}/>
   
    </React.Fragment>
  );
}
