import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.profileView || initialState;

export const selectProfileView = createSelector([selectSlice], state => state);
