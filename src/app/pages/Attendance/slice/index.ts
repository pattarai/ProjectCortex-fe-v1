import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { attendanceSaga } from './saga';
import { AttendanceState } from './types';

export const initialState: AttendanceState = [
  {
    id: 99,
    eventName: 'Think Tank',
    eventDate: 'Wed Dec 01 2021',
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
    eventDate: 'Wed Dec 01 2021',
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
    deleteUser(state, action: PayloadAction<any>) {
      state.forEach(
        st => st.id === action.payload && state.splice(state.indexOf(st), 1),
      );
    },
    updateUser(state, action: PayloadAction<any>) {
      const newArray = state.findIndex(st => st.id === action.payload.id);
      state[newArray] = { ...action.payload };
    },
  },
});

export const { actions: attendanceActions } = slice;

export const useAttendanceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: attendanceSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAttendanceSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
