import  React , {useState} from 'react';
//import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Drawer from '@mui/material/Drawer';

//import CardContent from '@mui/material/CardContent';
//import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
//import Grid from '@mui/material/Grid';
//import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Input from '@mui/material/Input';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useNavigate} from "react-router-dom";
import InfoCards from './InfoCards'
import ContactCard from './ContactCard'
import { useRealmApp } from "./RealmApp";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

 require('./css/App.css');




export default function GeneralInfo(props) {
  const navigate = useNavigate();
  //const app = useRealmApp();
    const app  = useRealmApp();
    const [appSite, setAppSite] = useState(app?.siteData);
  const [edit, setEditMode] = useState(false);
  const [editable, setEditableMode] = useState(false);

  const [error, setError] = useState();
  const [title, setTitle] = useState(app?.siteData?.pageData?.title);
  const [reservationButton, setReservationButton] = useState(app?.siteData?.pageData?.reservationButton);
  const [subtitle, setSubTitle] = useState(app?.siteData?.pageData?.subtitle);
  const [paragraph1, setParagraph1] = useState();
  const [paragraph2, setParagraph2] = useState();
   const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(!drawerState);
  };


   React.useEffect(() => {
console.log(app,"generl info");

    !title && setTitle(app?.siteData?.pageData?.title );
    !reservationButton && setReservationButton(app?.siteData?.pageData?.reservationButton);
    !subtitle && setSubTitle(app?.siteData?.pageData?.subtitle);
    !paragraph1 && app?.siteData?.pageData?.paragraphs&&  setParagraph1(app?.siteData?.pageData?.paragraphs[0]);
    !paragraph2 && app?.siteData?.pageData?.paragraphs && setParagraph2(app?.siteData?.pageData?.paragraphs[1]);


    setEditableMode(app?.currentUser?.customData.email && (app?.currentUser?.customData?.email==='kurawan@yahoo.com'));

  });  



  const handleSave = async (event) => {
    // eslint-disable-next-line no-console
    
      try {   
      const obj = {title, subtitle, reservationButton,paragraphs: [paragraph1, paragraph2]};
       const cardData = {pageData:obj,cardData:app?.siteData?.cardData };

      console.log(cardData);
       app?.editHomeData(cardData)
       .then((userdata)=>{console.log('edit data generalinfo',userdata)});

    } catch (err) {
     console.log(err)
  }
  //window.location.reload(true);
}



  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />


      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      { editable && <React.Fragment key={'right'}>

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
 <p>Welcome Awan to your private Admin section</p>

 <Typography component="h5" variant="h5" align="left" color="text.primary" gutterBottom>Admin Options</Typography>
<Switch
  checked={edit}
  onChange={(event)=>setEditMode(event.target.checked)}
  inputProps={{ 'aria-label': 'controlled' }}
/>
  <label>Edit</label>
  <Button onClick={handleSave}>Save</Button>
  <Button onClick={()=>{app.editHomeData(null); }}>Reset</Button>
</Box>  </Drawer>
        </React.Fragment>}
          {edit  ? <Box> <label>Replace title with::</label><Input   id="subTitle-replacement"
                  label="Replacetitle"
                  name="Replacetitle"
                  onChange={(event)=>{console.log(event.target.value); setTitle(event.target.value)}}

                  value={title}
                  placeholder='Enter Title text'
                /></Box>
         :<Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          {title} </Typography>}
          {edit ? <Box> <label>Replace Subtitle With::</label><Input   id="subTitle-replacement"
                  label="ReplaceSubtitle"
                  name="ReplaceSubtitle"
                  onChange={(event)=>setSubTitle(event.target.value)}
                  value={subtitle}
                  placeholder='Enter Button Text'
                /></Box>:
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          {subtitle}</Typography>}
        
        <Box>{edit && <label>Replace 1st Paragraph Text::</label>}
        <Typography onChange={(event)=>setParagraph1(event.target.value)}  component={edit ? "textarea" :'div'}>{paragraph1}</Typography>
        </Box>
         <Box>{edit && <label>Paragraph 2 Replacement Text::</label>} <Typography onChange={(event)=>setParagraph2(event.target.value)}
 component={edit ? "textarea" :'div'}   >{paragraph2}</Typography>
         </Box>
         <Typography>  </Typography>
          <Typography>  </Typography>
          {edit ? <Box>
        <label>Replace ButtonText::</label>
         <Input   id="makeReservation"
                  label="Make Reservation"
                  onChange={(event)=>setReservationButton(event.target.value)}
                  name="makeReservation"
                  value={reservationButton}
                  placeholder='Enter Button Text'
                /></Box>: <Button variant='outlined' fullWidth size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>{reservationButton}<AirportShuttleIcon/></Button>}
          

         <Typography>  </Typography>
         <Typography>  </Typography>
          <InfoCards /> 
          <ContactCard />       
      </Container>
       
    </React.Fragment>
  );
}

