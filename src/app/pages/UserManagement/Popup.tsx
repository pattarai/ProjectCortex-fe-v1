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
        <Box
          sx={style}
          style={{ width: '95%', height: '95%', overflowX: 'auto' }}
          className="w-md-50 h-md-60 d-md-flex flex-column justify-content-center"
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
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
          {children}
        </Box>
      </Modal>
    </>
  );
}
