import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userManagementSaga } from './saga';
import { UserManagementState } from './types';

export const initialState: UserManagementState = [
  {
    id: 100,
    name: 'Joshua',
    email: 'joshuafrankle7@gmail.com',
    role: 'VPE',
    project: 'Cortex',
  },
  {
    id: 101,
    name: 'Jesin',
    email: 'jesinthan@gmail.com',
    role: 'Director of Activities',
    project: 'Cortex',
  },
];

const slice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    deleteUser(state, action: PayloadAction<any>) {
      state.forEach(
        st => st.id === action.payload && state.splice(state.indexOf(st), 1),
      );
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
