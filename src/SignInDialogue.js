import React , {useEffect} from 'react';
import * as Realm from "realm-web";
import { useRealmApp, RealmAppProvider } from "./RealmApp";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SignIn from './Signin.js';
import SignUp from './Signup.js';

export default function FormDialog(props) {
  const app  = useRealmApp();
  const [open, setOpen] = React.useState(false);
  const [register, setRegister] = React.useState(false);
 // const [app, setApp] = React.useState(useRealmApp());
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('handleClose dialog', app.currentUser);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
     {register ? <SignUp register={setRegister} handleClose={handleClose}/> : <SignIn register={setRegister} handleClose={handleClose}/>}
        </DialogContent>

      </Dialog>
    </div>
  );
}
