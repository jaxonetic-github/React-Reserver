import  React , {useState} from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

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
import { useRealmApp } from "./RealmApp";



export default function InfoCards(props) {
  const navigate = useNavigate();
    const app = useRealmApp();
const [displayData, setDisplayData] = useState(app?.siteData?.cardData);
const [banner, setBanner] = useState('https://raw.githubusercontent.com/jaxonetic-github/React-Reserver/3f90afcd4efbb7e8a62559deaf8162e7bcdba2b8/public/driver1.jpeg'); 
   const [edit, setEditMode] = useState(false);
  const [editable, setEditableMode] = useState(app?.currentUser?.customData?.email);


   React.useEffect(() => {
setEditableMode(app?.currentUser?.customData?.email && (app?.currentUser?.customData?.email==='kurawan@yahoo.com'));
console.log(displayData,"--<Info Card info-->",app?.siteData?.cardData,'-iseditable->', editable);
 if(!displayData){
  console.log('setting displayData');
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
      console.log(obj,'--',editResults);

    } catch (err) {
     console.log('Infocards err',err);
  }
} 
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
          {editable && <Box component='form' sx={{ p: 2, border: '1px dashed grey', width:200 }}>
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
  <Button onClick={()=>{app.resetHomeData(); }}>Reset</Button>
</Box>}
      <Container sx={{marginTop:10}} maxWidth="md" component="main">
        <Grid container spacing={2} alignItems="flex-end">
          { displayData && displayData?.map((tier, index) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
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
                    console.log( event.target, 'cloning and resetting', clone);
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

