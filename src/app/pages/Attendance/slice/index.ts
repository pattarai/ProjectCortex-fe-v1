import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { attendanceSaga } from './saga';
import { AttendanceState } from './types';

export const initialState: AttendanceState = [
  {
    id: 99,
    eventName: 'React basics',
    eventType: 'learnzeit',
    eventDate: '12/01/2021',
    members: [
      {
        id: 1,
        name: 'Joshua',
        status: 1,
      },
      {
        id: 2,
        name: 'Jesin',
        status: 0,
      },
    ],
  },
  {
    id: 100,
    eventName: 'Elevate',
    eventType: 'crew',
    eventDate: '12/01/2021',
    members: [
      {
        id: 1,
        name: 'Dhivya',
        status: 0,
      },
      {
        id: 2,
        name: 'Veroni',
        status: 2,
      },
      {
        id: 3,
        name: 'Raksha',
        status: 1,
      },
      {
        id: 4,
        name: 'Subi',
        status: 0,
      },
    ],
  },
];

const slice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<any>) {
      const { eventId, ...rest } = action.payload;
      const thedata = state.find(event => event.id === eventId)?.members;
      if (thedata) {
        const newData = { id: thedata.length + 1, ...rest };
        thedata.push(newData);
      }
    },

    updateUser(state, action: PayloadAction<any>) {
      const { eventId, member } = action.payload;
      const selectedEventId = state.findIndex(event => event.id === eventId);
      const selectedMemberId = state[selectedEventId].members.findIndex(
        user => user.id === member.id,
      );
      state[selectedEventId].members[selectedMemberId] = member;
    },

    deleteUser(state, action: PayloadAction<any>) {
      const { eventId, deleteMembers } = action.payload;
      const selectedEventId = state.findIndex(event => event.id === eventId);
      deleteMembers.forEach((member: number) => {
        const selectedMemberId = state[selectedEventId].members.findIndex(
          user => user.id === member,
        );
        state[selectedEventId].members.splice(selectedMemberId, 1);
      });
    },
  },
});

export const { actions: attendanceActions } = slice;

export const useAttendanceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: attendanceSaga });
  return { actions: slice.actions };
};
