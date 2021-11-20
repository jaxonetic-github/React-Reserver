import  React , {useState} from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdminDrawerMenu from './AdminMenu';

import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
//import {Link as ReactLink} from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useRealmApp } from "../RealmApp";

import { CONTACTINFO} from '../constants'

export default function ContactCard(props) {
  const navigate = useNavigate();
    const app = useRealmApp();
const [displayData, setDisplayData] = useState(app?.siteData?.contactData);
   const [edit, setEditMode] = useState(false);
  const [editable, setEditableMode] = useState(app?.currentUser?.customData?.email);
 const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(!drawerState);
  };

   React.useEffect(() => {

setEditableMode(app?.currentUser?.customData?.email && (app?.currentUser?.customData?.email==='kurawan@yahoo.com'));
 if(!displayData){
  setDisplayData(app?.siteData?.contactData);
}
//console.log(app,'----',editable,"editable",app?.profile?.email);
  //const displayData = props.cardData? props.cardData :app?.siteData?.cardData;
//setDisplayData(app?.siteData?.cardData)
 //console.log(title,'  +==============++',app?.siteData?.pageData?.title);
  });  


  const handleSave = async (event) => {
    // eslint-disable-next-line no-console
    
      try {   
      const obj = {cardData:app?.siteData?.cardData,pageData:app?.siteData?.pageData, contactData:displayData };
      const editResults= await app?.editHomeData(obj)

    } catch (err) {
     console.log('CONTACT err',err);
  }
} 
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

{AdminDrawerMenu(toggleDrawer,handleSave, drawerState,editable,setEditMode, edit)}

      <Container sx={{marginTop:10}} maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-end">
        
            <Grid item key={CONTACTINFO.title} xs={12} sm={12} md={12}>
              <Card><img src={CONTACTINFO.imageURL}  className="driver1-image" alt="logo" />
                <CardHeader
                  title={CONTACTINFO.title}
                  subheader={CONTACTINFO.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={CONTACTINFO.title === 'Pro' ? <StarIcon /> : null}
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
                    { displayData && displayData.description.map((line,descriptionIndex) => (
                      <Typography
                        component="li"
                       
                        align="center"
                        key={descriptionIndex+line}
                      >
                  {line}
                   {edit &&    <Input   id="makeReservation"
                  label="Make Reservation"
                  onBlur={(event)=>{
                    const clone = JSON.parse(JSON.stringify(displayData));
                    clone.description[descriptionIndex]=event.target.value;
                    console.log( event.target, 'cloning and resetting', clone);
                  setDisplayData(clone);
                    

                }}
                  name="makeReservation"
                  defaultValue={displayData.description[descriptionIndex]}
               
                />}
                      </Typography>
                    ))}
                  </ul>
                 {  <Button variant='outlined' fullWidth size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>{'reserve now '}<AirportShuttleIcon/></Button>}
                </CardContent>
        
              </Card>
            </Grid>
          
        </Grid>
      </Container>
     
    </React.Fragment>
  );
}

