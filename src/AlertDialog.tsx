import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { reset } from './App';

export interface AlertDialogProps {
  title: string,
  visible: boolean,
  onClosed: () => void
  onReset: () => void
}

export default function AlertDialog({visible, onClosed, onReset, title}: AlertDialogProps) {
  const [time, setTimer] = React.useState(0);
  useEffect(() => {
    const fetchData = async () => {
      await startTimer();  
    }

    if(visible) {
      setTimer(10);
      
      fetchData().catch(console.error);
    }

    
  },[visible])

  const startTimer = async () => {
    console.log('found')
    for(let i = 10; i >= 0; i--) {
      if(reset === false){
      console.log('found' + i)
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      console.log(i)
      setTimer(i);

      if(i == 0) {
        onClosed();
        onReset();
      }
    }
    }
  }

  const handleClickOpen = () => {
    onClosed();
  };

  const handleClose = () => {
    onClosed();
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <Dialog
        open={visible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>{"Reset (" + (time) + "s)"}</Button>
          <Button onClick={handleClose} autoFocus>
            Review match
          </Button>
        </DialogActions>
      </Dialog>
  );
}