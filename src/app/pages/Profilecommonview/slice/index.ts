import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ProfileCommonViewState } from './types';

export const initialState: ProfileCommonViewState = [
  {
    name: 'Subi',
    committee: 'Innovation & Media',
    project: 'Cortex',
  },
  {
    name: 'Abi',
    committee: 'Events',
    project: 'Helix',
  },
];

const slice = createSlice({
  name: 'profileCommonView',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions: profileCommonViewActions } = slice;

export const useProfileCommonViewSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useProfileCommonViewSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
