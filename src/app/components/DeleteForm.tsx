import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function DeleteForm({ setOpenModal, action, setLoading }) {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpenModal(false);
          setLoading(true);
          dispatch(action);
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
  );
}
