import * as React from 'react';
import { Box, Backdrop, Modal, IconButton } from '@mui/material';
import { MdOutlineCancel } from 'react-icons/md';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  title,
  openModal,
  setOpenModal,
  children,
}) {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style} className="w-md-50">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>{title}</h1>
            <IconButton
              color="error"
              aria-label="upload picture"
              component="span"
              onClick={() => setOpenModal(false)}
            >
              <MdOutlineCancel />
            </IconButton>
          </div>
          {children}
        </Box>
      </Modal>
    </>
  );
}
