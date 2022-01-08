import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { profileViewSaga } from './saga';
import { ProfileViewState } from './types';

export const initialState: ProfileViewState = [
  {
    dp: 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/cf3851a824eee5981be13591f44bbd5f-1592046164/hitoridraws-prettyportrait-color/draw-your-dp-avatar-profile-pic-and-make-it-simple-and-cute.png',
    name: 'Subhiksha',
    project: 'Cortex',
    committee: 'Events',
    description: 'I love  Coding with Veroni',
    position: 'Events',
    positionst: '02',
    github: 'Events',
    expert: 'Events',
    linkedin: 'Events',
    email: 'Events',
    address: 'Events',
    phone: 'Events',
    rollno: 'Events',
    year: 'Events',
    department: 'Events',
    college: 'Events',
    topskills: 'Events',
    passion: 'Events',
  },
];

const slice = createSlice({
  name: 'profileView',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions: profileViewActions } = slice;

export const useProfileViewSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileViewSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useProfileViewSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
