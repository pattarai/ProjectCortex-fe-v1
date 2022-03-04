import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.rankingAdmin || initialState;

export const selectRankingAdmin = createSelector([selectSlice], state => state);
