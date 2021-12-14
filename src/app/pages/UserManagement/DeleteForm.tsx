import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function DeleteForm({ deleteUser, setOpenModal, actions }) {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(actions.deleteUser(deleteUser));
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
