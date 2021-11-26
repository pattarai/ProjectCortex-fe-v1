import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => initialState || state.userManagement;

export const selectUserManagement = createSelector(
  [selectSlice],
  state => state,
);
