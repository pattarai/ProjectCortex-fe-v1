import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userManagementSaga } from './saga';
import { UserManagementState } from './types';

export const initialState: UserManagementState = {
  error: false,
  users: [],
  committeeList: [],
  projectList: [],
  roleList: [],
};

const slice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    getUser() {},
    addUser(state, action: PayloadAction<any>) {},
    updateUser(state, action: PayloadAction<any>) {},
    deleteUser(state, action: PayloadAction<any>) {},

    setInitialData(state, action: PayloadAction<any>) {
      const { users, committeeList, projectList, roleList } = action.payload;
      state.users = [...users];
      state.committeeList = [...committeeList];
      state.projectList = [...projectList];
      state.roleList = [...roleList];
    },

    setAddUser(state, action: PayloadAction<any>) {
      state.users.push(action.payload);
    },

    setUpdateUser(state, action: PayloadAction<any>) {
      const newArray = state.users.findIndex(
        st => st.userId === action.payload.userId,
      );
      state.users[newArray] = { ...action.payload };
    },

    setDeleteUser(state, action: PayloadAction<any>) {
      state.users.forEach(
        st =>
          st.userId === action.payload &&
          state.users.splice(state.users.indexOf(st), 1),
      );
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
