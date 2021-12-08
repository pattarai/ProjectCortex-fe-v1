import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { attendanceSaga } from './saga';
import { AttendanceState } from './types';

export const initialState: AttendanceState = [
  {
    id: 100,
    sno: 1,
    name: 'Joshua',
    status: 'present',
  },
];

const slice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<any>) {
      const { id, ...rest } = action.payload;
      const newId = state.length > 0 ? state[0].id - 1 : state.length + 100;
      const newData = { id: newId, ...rest };
      state.unshift(newData);
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
