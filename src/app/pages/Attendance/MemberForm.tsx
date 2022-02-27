import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function MemberForm({ currentEventId, setOpenModal, actions }) {
  const dispatch = useDispatch();

  const [memberName, setMemberName] = useState('');

  const [errors, setErrors] = useState({
    memberNameError: '',
    isError: false,
  });

  function handleSubmit() {
    let err = { ...errors };
    if (memberName.trim() === '') {
      err.memberNameError = 'Name is required';
      err.isError = true;
      setErrors(err);
    } else {
      dispatch(
        actions.addExternalMember({
          eventId: currentEventId,
          name: memberName,
        }),
      );
      setOpenModal(false);
    }
  }

  return (
    <div>
      <TextField
        id="outlined-basic"
        error={errors.isError && (memberName.trim() === '' ? true : false)}
        helperText={
          errors.isError &&
          (errors.memberNameError !== '' ? errors.memberNameError : '')
        }
        label="Name"
        variant="outlined"
        sx={{ width: '100%' }}
        onChange={e => setMemberName(e.target.value)}
      />
      <Button onClick={handleSubmit} variant="outlined" className="mt-2">
        Add
      </Button>
    </div>
  );
}
