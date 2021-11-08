import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useRealmApp } from "../RealmApp";
import {Link, useNavigate} from "react-router-dom";

const steps = ['Itinerary', 'Customer Agreements', 'Review your order'];


const theme = createTheme();

export default function Checkout() {
  const realmApp  = useRealmApp();
    const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState(realmApp.currentUser?.customData?.firstName);
  const [lastName, setLastName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [phone, setPhone] = React.useState();

  const [activeStep, setActiveStep] = React.useState(0);
  const [pickUpDate, setPickUpDate] = React.useState(new Date());
  const [dropOffDate, setDropoffDate] = React.useState(new Date());
  const [dropOffLocation, setDropoffLocation] = React.useState('');
  const [pickupLocation, setPickupLocation] = React.useState('');

function getStepContent(step) {
  console.log(step);
  switch (step) {
    case 0:
      return <AddressForm onChange={onChange}/>;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review reservation={{
  userid:realmApp?.profile?.userid,
pickUpDate:pickUpDate,
dropOffDate:dropOffDate,
dropOffLocation:dropOffLocation,
pickupLocation:pickupLocation,
firstName:firstName,
lastName:lastName,
email: email,
createdDate:new Date(),
phone:phone}}/>;
    default:
      throw new Error('Unknown step');
  }
}


 const onChange = (event) =>{
    
      console.log(event.target.name, event.target.value);
    switch (event.target.name) {
  case 'email':setEmail(event.target.value);break;
  case 'password':setPassword(event.target.value);break;
  case 'phone':setPhone(event.target.value);break;

  case 'firstName':setFirstName(event.target.value);break;
  case 'lastName':setLastName(event.target.value);break;
  case 'pickupdate':console.log(event.target.value,'reservation pickupdate is type',typeof event.target.value);setPickUpDate(event.target.value);break;
  case 'dropoffDate': setDropoffDate(event.target.value); break;
  case 'dropoffLocation': setDropoffLocation(event.target.value); break;
  case 'pickupLocation': setPickupLocation(event.target.value); break;
  default:
    console.log(`Sorry, we are out of ${event.target.name}.`);

  }
}

  const handleNext = async (event) => {
    if(activeStep === steps.length - 1){
        //  const data = new FormData(event.currentTarget);
      console.log('Place Order', getStepContent(activeStep));
      realmApp.insertReservations({
userid:realmApp?.currentUser?.id,
pickUpDate:pickUpDate,
dropOffDate:dropOffDate,
dropOffLocation:dropOffLocation,
pickupLocation:pickupLocation,
firstName:firstName,
lastName:lastName,
email:email,
createdDate:(new Date()).toDateString(),
phone:phone});

      navigate('/reservations');
    }
    else if (activeStep === 0){
          console.log(realmApp.currentUser,"handl00000enext", activeStep)

      if(password ){

      //register with the email and password
      await realmApp.registerWithEmail(email, password, firstName,lastName) ;
      console.log(realmApp,"new user added?");
    }}
    //don't step forward unless fields are error free
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
