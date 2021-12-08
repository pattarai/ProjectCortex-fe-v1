import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.attendance || initialState;

export const selectAttendance = createSelector([selectSlice], state => state);
