import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.events || initialState;

export const selectEvents = createSelector([selectSlice], state => state);
