import { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';

export default function MemberForm({
  currentEventId,
  setOpenModal,
  actions,
  updateMember,
  crewAttendance,
}) {
  const dispatch = useDispatch();

  const [member, setMember] = useState({
    memberName: '',
    memberStatus: 1,
  });
  let updateMemberName = '';

  const [errors, setErrors] = useState({
    memberNameError: '',
    isError: false,
  });

  if (updateMember) {
    const member = crewAttendance.find(
      member => member.userId === updateMember,
    );
    updateMemberName = `${member.users.firstName} ${member.users.lastName}`;
  }

  function handleUpdateOrSubmit() {
    if (updateMember) {
      dispatch(
        actions.updateCrewMember({
          userId: updateMember,
          status: member.memberStatus,
        }),
      );
    } else {
      let err = { ...errors };
      if (member.memberName.trim() === '') {
        err.memberNameError = 'Name is required';
        err.isError = true;
        setErrors(err);
      } else {
        dispatch(
          actions.addExternalMember({
            eventId: currentEventId,
            name: member.memberName,
          }),
        );
      }
    }
    setOpenModal(false);
  }

  return (
    <>
      <TextField
        disabled={updateMember ? true : false}
        id="outlined-basic"
        value={updateMember ? updateMemberName : member.memberName}
        label="Name"
        variant="outlined"
        sx={{ width: '100%', mb: '1rem' }}
      />
      {updateMember && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            name="role"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={member.memberStatus.toString()}
            label="Roles"
            onChange={e =>
              setMember({ ...member, memberStatus: parseInt(e.target.value) })
            }
            className="mb-3"
          >
            <MenuItem value={0}>Absent</MenuItem>
            <MenuItem value={1}>Present</MenuItem>
            <MenuItem value={2}>Informed</MenuItem>
          </Select>
        </FormControl>
      )}
      <Button onClick={handleUpdateOrSubmit} variant="outlined" className="">
        {updateMember ? 'Update' : 'Add'}
      </Button>
    </>
  );
}
