import { PayloadAction, current } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { attendanceSaga } from './saga';
import { AttendanceState } from './types';

export const initialState: AttendanceState = {
  currentAction: '',
  events: [
    {
      id: 99,
      eventName: 'Think Tank',
      eventDate: '12/01/2021',
      members: [
        {
          id: 1,
          name: 'Joshua',
          status: 'Present',
        },
        {
          id: 2,
          name: 'Jesin',
          status: 'Absent',
        },
      ],
    },
    {
      id: 100,
      eventName: 'Elevate',
      eventDate: '12/01/2021',
      members: [
        {
          id: 1,
          name: 'Dhivya',
          status: 'Present',
        },
        {
          id: 2,
          name: 'Veroni',
          status: 'Absent',
        },
      ],
    },
  ],
};

const slice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<any>) {
      state.currentAction = 'addMember';
      const { eventId, ...rest } = action.payload;
      const thedata = state.events.find(event => event.id === eventId)?.members;
      if (thedata) {
        const newData = { id: thedata.length + 1, ...rest };
        thedata.push(newData);
      }
    },

    updateUser(state, action: PayloadAction<any>) {
      state.currentAction = 'updateMember';
      const { eventId, member } = action.payload;
      const selectedEventId = state.events.findIndex(
        event => event.id === eventId,
      );
      const selectedMemberId = state.events[selectedEventId].members.findIndex(
        user => user.id === member.id,
      );
      state.events[selectedEventId].members[selectedMemberId] = member;
      console.log(
        current(state.events[selectedEventId].members[selectedMemberId]),
      );
    },
  },
});

export const { actions: attendanceActions } = slice;

export const useAttendanceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: attendanceSaga });
  return { actions: slice.actions };
};
