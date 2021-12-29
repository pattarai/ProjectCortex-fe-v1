import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userManagementSaga } from './saga';
import { UserManagementState } from './types';

export const initialState: UserManagementState = [
  {
    uid: 99,
    first_name: 'Joshua',
    last_name: 'Frankle',
    email: 'joshuafrankle7@gmail.com',
    role: 'VPE',
    rank: 'Copper',
    project: 'Cortex',
    committee: 'EV',
    start_date: null,
  },
  {
    uid: 100,
    first_name: 'Jesinthan',
    last_name: 'J',
    email: 'jesinthan@gmail.com',
    role: 'Director of Activities',
    rank: 'Gold',
    project: 'Cortex',
    committee: 'EV',
    start_date: null,
  },
];

const slice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    getUser: () => {},
    setUser(state, action: PayloadAction<any>) {
      state.push(...action.payload);
    },
    addUser(state, action: PayloadAction<any>) {
      const { id, ...rest } = action.payload;
      const newId = state.length > 0 ? state[0].uid - 1 : state.length + 100;
      const newData = { id: newId, ...rest };
      state.unshift(newData);
    },
    deleteUser(state, action: PayloadAction<any>) {
      state.forEach(
        st => st.uid === action.payload && state.splice(state.indexOf(st), 1),
      );
    },
    updateUser(state, action: PayloadAction<any>) {
      const newArray = state.findIndex(st => st.uid === action.payload.id);
      state[newArray] = { ...action.payload };
    },
  },
});

export const { actions: userManagementActions } = slice;

export const useUserManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userManagementSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useUserManagementSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
