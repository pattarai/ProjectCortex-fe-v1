import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userManagementSaga } from './saga';
import { UserManagementState } from './types';

export const initialState: UserManagementState = {
  error: false,
  users: [],
};

const slice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    getUser() {},
    addUser(state, action: PayloadAction<any>) {},
    updateUser(state, action: PayloadAction<any>) {},
    deleteUser(state, action: PayloadAction<any>) {},
    setUser(state, action: PayloadAction<any>) {
      state.users.push(...action.payload);
      state.error = false;
    },

    setUpdateUser(state, action: PayloadAction<any>) {
      const newArray = state.users.findIndex(
        st => st.uid === action.payload.uid,
      );
      state.users[newArray] = { ...action.payload };
      state.error = false;
    },

    setDeleteUser(state, action: PayloadAction<any>) {
      state.users.forEach(
        st =>
          st.uid === action.payload &&
          state.users.splice(state.users.indexOf(st), 1),
      );
      state.error = false;
    },

    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
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
