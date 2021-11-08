import React  from 'react';
import { useRealmApp } from "./RealmApp";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Profile from './Profile.js';

export default function FormDialog(props) {
  const app  = useRealmApp();
  const [open, setOpen] = React.useState(false);
 // const [app, setApp] = React.useState(useRealmApp());
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
     <Profile  handleClose={handleClose}/>}
        </DialogContent>

      </Dialog>
    </div>
  );
}
