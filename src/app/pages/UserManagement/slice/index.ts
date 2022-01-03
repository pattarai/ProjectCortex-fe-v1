import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userManagementSaga } from './saga';
import { UserManagementState } from './types';

export const initialState: UserManagementState = [];

const slice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    getUser() {},
    addUser(state, action: PayloadAction<any>) {},
    updateUser(state, action: PayloadAction<any>) {},
    deleteUser(state, action: PayloadAction<any>) {
      state.forEach(
        st => st.uid === action.payload && state.splice(state.indexOf(st), 1),
      );
    },
    setUser(state, action: PayloadAction<any>) {
      state.push(...action.payload);
    },
    setUpdateUser(state, action: PayloadAction<any>) {
      const newArray = state.findIndex(st => st.uid === action.payload.uid);
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
