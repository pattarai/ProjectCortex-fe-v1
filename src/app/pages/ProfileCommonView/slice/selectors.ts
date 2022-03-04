import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.profileCommonView || initialState;

export const selectProfileCommonView = createSelector(
  [selectSlice],
  state => state,
);
