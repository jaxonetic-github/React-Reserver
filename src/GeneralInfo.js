import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import {Link as ReactLink} from "react-router-dom";
import { useNavigate} from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        8 ANGELS AKOK TRANSPORTATION, LLC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Features',
    price: 'For your Comfort and Protection',
    description: [
      'Seats upto 4 Passengers',
      'No smoking or Pets',
      'camera in vehicle',
      'hand sanitizers and wipes',
    ],
  },
  {
    title: 'More Info',

    price: '15',
    description: [
      'Driver:            Mr Awan Kur',
      'Phone :           480-809-7897',
      'Email :      kurawan@yahoo.com',
      'Or click below  to get started',     ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Arrive in styles',
    price: '30',
    description: [
      'Weddings',
      'Airport Escorts',
      'Business Conventions',
      'Concentions',
    ],
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [ 'Developer stuff'],
  },
  {
    title: 'Our Network',
    description: ['Resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function PricingContent() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
               <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Service
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Entertainment and Pleasure
        </Typography>
        <Typography>
        8 ANGELS is uniquely prepared to meet your private transportation needs. 
         Our  program serves  a range of industries and occasions, including Concert/tours,
          sporting events, business venues, wedding events and more. You can depend on an affordable spacious vehicle.
            We've got you covered!</Typography>

          <Typography>This Vehicle is exclusively for transportation to and from hotels and events.  It is also 
          a perfect choice to transport groomsmen and bridesmaids during wedding preparations</Typography>
         <Typography>  </Typography>
          <Typography>  </Typography>
         <Typography component="div" align="center">
         <Button variant='outlined'  size="large" onClick={()=>navigate('checkout')}  sx={{ mt: 2 , color:'605757'}}>
        Make Another Reservation
      </Button> </Typography>
         <Typography>  </Typography>
         <Typography>  </Typography>
                         
                   
                
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
        
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
