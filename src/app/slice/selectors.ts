import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.userManagement || initialState;

export const selectUserManagement = createSelector(
  [selectSlice],
  state => state,
);
