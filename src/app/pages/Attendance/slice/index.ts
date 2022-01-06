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
      const memberList = state.find(event => event.id === eventId)?.members;
      if (memberList) {
        const newId =
          memberList.length > 0 ? memberList[memberList.length - 1].id + 1 : 1;
        const newMember = { id: newId, ...rest };
        memberList.push(newMember);
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
      const newMemberList = state[selectedEventId].members.filter(user => {
        return !deleteMembers.includes(user.id);
      });
      state[selectedEventId].members = newMemberList;
    },
  },
});

export const { actions: attendanceActions } = slice;

export const useAttendanceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: attendanceSaga });
  return { actions: slice.actions };
};
