import {
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material';
import { MdOutlineCancel } from 'react-icons/md';

export default function TransitionsModal({
  title,
  openModal,
  setOpenModal,
  children,
}) {
  return (
    <>
      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="d-flex justify-content-between align-items-center m-3 mx-4">
          <h1>{title}</h1>
          <IconButton
            color="error"
            aria-label="close"
            component="span"
            onClick={() => setOpenModal(false)}
          >
            <MdOutlineCancel />
          </IconButton>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
