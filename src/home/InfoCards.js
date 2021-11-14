import  React , {useState} from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';

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

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function InfoCards(props) {
  const navigate = useNavigate();
    const app = useRealmApp();
const [displayData, setDisplayData] = useState(app?.siteData?.cardData);
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
  setDisplayData(app?.siteData?.cardData);
}
//console.log(app,'----',editable,"editable",app?.profile?.email);
  //const displayData = props.cardData? props.cardData :app?.siteData?.cardData;
//setDisplayData(app?.siteData?.cardData)
 //console.log(title,'  +==============++',app?.siteData?.pageData?.title);
  });  


  const handleSave = async (event) => {
    // eslint-disable-next-line no-console
    
      try {   
      const obj = {cardData:displayData,pageData:app?.siteData?.pageData };
      const editResults= await app?.editHomeData({cardData:displayData,pageData:app?.siteData?.pageData })

    } catch (err) {
     console.log('Infocards err',err);
  }
  window.location.reload(true);
} 
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
{editable && 
      <React.Fragment key={'right'}>

        <IconButton
                  onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 ,position:'relative', top:'50px'}}
          >
            <MenuIcon />Admin
          </IconButton>
    

          <Drawer
            anchor={'right'}
            open={drawerState}
            onClose={toggleDrawer}
          >
            <Box component='form' sx={{ p: 2, border: '1px dashed grey', width:200 }}>
 <p>Admin section</p>
Edit CardInfo
 <Typography component="h5" variant="h5" align="left" color="text.primary" gutterBottom>Admin Options</Typography>
<Switch
  checked={edit}
  onChange={(event)=>setEditMode(event.target.checked)}
  inputProps={{ 'aria-label': 'controlled' }}
/>
  <label>Edit</label>
  <Button onClick={handleSave}>Save</Button>
  <Button onClick={()=>{app.resetHomeData(); window.location.reload(true); }}>Reset</Button>
</Box>
          </Drawer>
        </React.Fragment>
  }

      <Container sx={{marginTop:10}} maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-end">
          { displayData && displayData?.map((tier, index) => (
            <Grid item key={tier.title} xs={12} sm={12} md={6}>
              <Card><img src={tier.imageURL}  className="driver1-image" alt="logo" />
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
                    {tier.description.map((line,descriptionIndex) => (
                      <Typography
                        component="li"
                       
                        align="center"
                        key={index+descriptionIndex+line}
                      >
                  {line}
                   {edit &&    <Input   id="makeReservation"
                  label="Make Reservation"
                  onBlur={(event)=>{
                    const clone = JSON.parse(JSON.stringify(displayData));
                    clone[index].description[descriptionIndex]=event.target.value;
                  setDisplayData(clone);
                    event.target.focus();

                }}
                  name="makeReservation"
                  defaultValue={displayData[index].description[descriptionIndex]}
               
                />}
                      </Typography>
                    ))}
                  </ul>
                 {  <Button variant='outlined' fullWidth size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>{'reserve now '}<AirportShuttleIcon/></Button>}
                </CardContent>
        
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
     
    </React.Fragment>
  );
}

