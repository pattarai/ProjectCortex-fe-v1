import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function DeleteForm({ setOpenModal, action }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={async () => {
              setLoading(true);
              await dispatch(action);
              setOpenModal(false);
            }}
          >
            yes
          </Button>
          <Button
            variant="outlined"
            className="ms-2"
            onClick={() => setOpenModal(false)}
          >
            No
          </Button>
        </>
      )}
    </>
  );
}
