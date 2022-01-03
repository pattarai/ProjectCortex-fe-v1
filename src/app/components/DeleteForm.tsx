import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function DeleteForm({ setOpenModal, action, setLoading }) {
  const dispatch = useDispatch();
  return (
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
  );
}
