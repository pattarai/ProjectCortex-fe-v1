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
  updateMemberId,
  crewAttendance,
}) {
  const dispatch = useDispatch();

  const updateMember = updateMemberId
    ? crewAttendance.find(mem => mem.userId === updateMemberId)
    : null;

  const [member, setMember] = useState({
    memberName: updateMember
      ? `${updateMember.users.firstName} ${updateMember.users.lastName}`
      : '',
    memberStatus: updateMember ? updateMember.status : 1,
  });

  const [errors, setErrors] = useState({
    memberNameError: '',
    isError: false,
  });

  function handleUpdateOrSubmit() {
    if (updateMemberId) {
      dispatch(
        actions.updateCrewMember({
          userId: updateMemberId,
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
        disabled={updateMemberId ? true : false}
        id="outlined-basic"
        value={member.memberName}
        label="Name"
        variant="outlined"
        sx={{ width: '100%', mb: '1rem' }}
        onChange={e => setMember({ ...member, memberName: e.target.value })}
      />
      {updateMemberId ? (
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
      ) : null}
      <Button onClick={handleUpdateOrSubmit} variant="outlined" className="">
        {updateMemberId ? 'Update' : 'Add'}
      </Button>
    </>
  );
}
