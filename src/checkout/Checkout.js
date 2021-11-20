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
import AssignmentIcon from '@mui/icons-material/Assignment';

import Reservations from './Reservations';
import AgreementForm from './AgreementForm';
import Review from './Review';
import { useRealmApp } from "../RealmApp";
import {Link, useNavigate} from "react-router-dom";
import validator from 'validator';

const steps = ['Itinerary', 'Agreements', 'Review'];


const theme = createTheme();



export default function Checkout() {
  const realmApp  = useRealmApp();
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState(realmApp.currentUser?.customData?.firstname||'');
  const [lastName, setLastName] = React.useState(realmApp.currentUser?.customData?.lastname||'');
  const [email, setEmail] = React.useState(realmApp?.currentUser?.customData?.email||'');
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [phone, setPhone] = React.useState(realmApp?.currentUser?.customData?.phone||'');

  const [activeStep, setActiveStep] = React.useState(0);
  const [pickUpDate, setPickUpDate] = React.useState(new Date());
  const [dropOffDate, setDropoffDate] = React.useState(new Date());
  const [dropOffLocation, setDropoffLocation] = React.useState('');
  const [pickupLocation, setPickupLocation] = React.useState('');
  const [itineraryValid, setItineraryValid] = React.useState(false);

  const [agreementSignature, setAgreementSignature] = React.useState('');
  const [agreementChecked, setAgreementChecked] =React.useState(false);

  const [paymentSucceeded, setPaymentSucceeded] = React.useState(false);


  React.useEffect(() => {
   console.log( activeStep,lastName, firstName,error);
    /*setFirstName(realmApp?.currentUser?.customData?.firstname);
    setLastName(realmApp?.currentUser?.customData?.lastname);
    setEmail(realmApp?.currentUser?.customData?.email);
    setPhone(realmApp?.currentUser?.customData?.phone);*/
/*    if(app?.currentUser?.customData?.firstName){
     
      getProfile().then((pr)=>{console.log('profile result',pr); setProfile(pr)});      
   }*/
  });

   function itineraryValidated  (currentStep){
    let validated = false;
    if(currentStep===0){
         const phoneValidated = phone && validator.isMobilePhone(phone);
         const emailValidated = email && validator.isEmail(email);
         const pickupLocationValidated = pickupLocation && !validator.isEmpty(pickupLocation);
         const dropOffLocationValidated = dropOffLocation && !validator.isEmpty(dropOffLocation);
         const firstNameValidated = firstName && !validator.isEmpty(firstName);
         const lastNameValidated = lastName && !validator.isEmpty(lastName);
           validated = (phoneValidated && emailValidated && pickupLocationValidated && dropOffLocationValidated && firstNameValidated && lastNameValidated);
      }else
         if(currentStep===1){
          const agreementSignatureValidated = !validator.isEmpty(agreementSignature);
          validated = agreementSignatureValidated && agreementChecked;
         }
         else 
          if(currentStep===2) {
            //if we made it this far everything has been validated
            validated = paymentSucceeded;
          }

      return validated;
}

function getStepContent(step) {
  const tmpRes = {
                    userid:realmApp?.currentUser?.id,
                   pickUpDate:pickUpDate,
                    dropOffDate:dropOffDate,
                   dropOffLocation:dropOffLocation,
                   pickupLocation:pickupLocation,
                   firstName:firstName,
                    lastName:lastName,
                      email:email,
                      createdDate:new Date(),
                      phone:phone}; 

  switch (step) {
    case 0:
      return <AddressForm onChange={onChange}/>;
    case 1:
      return <AgreementForm onChange={onChange} />;
    case 2:
      return <Review handleSuccess={(successEvent)=> 
                                        {
                                          if(successEvent.status=='OK'){
                                          setPaymentSucceeded(true); 
                                        realmApp.insertReservations(tmpRes); 
                                         setActiveStep(activeStep + 1);
                                       }else{console.log("Credit Error::=>",successEvent.errors)}
                                      }}
                      reservation={tmpRes}
            />;
    default:
      throw new Error('Unknown step');
  }
}


 const onChange = (event) =>{
    
     
    switch (event.target.name) {
  case 'agreementSignature':setAgreementSignature(event.target.value); break;
  case 'agreementChecked' : setAgreementChecked(event.target.checked); break;
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
          let canContinue = false;
    if(activeStep === steps.length - 1){
        //  const data = new FormData(event.currentTarget);
       
    }
    else if (activeStep === 0){
        //if(fullyValidated){
          if(password ){
          //register with the email and password
              try{
             const {error} =  await realmApp.registerWithEmail(email, password, firstName,lastName, phone) ;
             console.log('result....',error);
             //canContinue = success  ;
             if(error)
             setError(error);
           else canContinue=true;
            // console.log(success,'========',error )
            }catch(err){
        console.log('Error attempting to register user',err);
            }
          
          }//if passwd
    else { canContinue=true;}
if (canContinue) {setActiveStep(activeStep + 1); setError(null)}

   }//if(activestep ===0)
else if(activeStep ===1){
setError(null);
  setActiveStep(activeStep + 1);

}
  }//handlenext();

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setError(null);

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
                  Your order number is #2001539. You will be contacted shortly by your driver to make introductions and finalize the registration.
                </Typography>
                <Button variant='outlined' sx={{ marginTop:'20px' }}  size="large" onClick={()=>{ navigate('/reservations');}}><AssignmentIcon />View Reservations</Button>
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
                  disabled={!itineraryValidated(activeStep)}
                 
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
    <Typography component="span"  align="center" sx={{color:'red'}}>
       {error}
          </Typography>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
