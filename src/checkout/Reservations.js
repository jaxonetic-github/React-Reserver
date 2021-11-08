import React, {  useState, useEffect }from 'react';

import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useRealmApp } from "../RealmApp";
import { useNavigate} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';


function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

/**
 *  View a history of Reservations
 * Sample:
 * const reservation = {
 * userid:"6182198ee43796e8d32aff28",
 * pickUpDate:"12:12:10",
 * pickUpTime:"02:03:04"
 * destination:"destinationf"
 * firstName:"A",
 * lastName:"Z",
 * email:"az@email",
 * createdDated:'12:11:12',
 * phone:"555-555-5555"};
 *
 */
export default function Reservations() {
  const [realmApp, setRealmApp] = useState(useRealmApp());
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  useEffect(async    ()=>{
     const res= await realmApp?.currentUser?.functions?.FindReservation();
       if(res){
         setReservations(JSON.parse(res));     
       }
  })
  
  const adjustDate = (someDate)=>
 (someDate && ((typeof someDate) === 'object' )? someDate.toDateString() : someDate);
 
  return (
    <React.Fragment>
    <Container >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Reservations
    </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Created On</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>PickUp & Drop Off</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation, index) => 
            (<TableRow key={index}>
              <TableCell>{reservation.createdDate}</TableCell>
              <TableCell>{reservation.firstName} {reservation.lastName}{reservation.email}<p>{reservation.phone}</p></TableCell>
              <TableCell>{reservation.pickupLocation}<p>{new Date( reservation.pickUpDate).toLocaleString()}</p>{reservation.dropOffLocation}<p>{new Date(reservation.dropOffDate).toLocaleString()}</p></TableCell>
            </TableRow>)
          )}
          <TableRow >
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
        </TableBody>
      </Table>
           <Button variant='outlined'  size="large" onClick={()=>navigate('/checkout')}  sx={{ mt: 2 , color:'605757'}}>
        Make Another Reservation
      </Button>
      </Container>

 
    </React.Fragment>
  );
}
