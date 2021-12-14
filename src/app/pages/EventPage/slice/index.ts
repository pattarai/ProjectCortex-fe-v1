import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { eventsSaga } from './saga';
import { EventsState } from './types';

export const initialState: EventsState = [
  {
    id: 1,
    name: 'Sofia',
    dateTime: '2021-02-03 17:00:00',
    phase: 1,
  },
  {
    id: 2,
    name: 'Semiya',
    dateTime: '2021-02-03 17:00:00',
    phase: 2,
  },
];

const slice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<any>) {
      const { id, ...rest } = action.payload;
      const newId = state.length > 0 ? state[0].id - 1 : state.length + 100;
      const newData = { id: newId, ...rest };
      state.unshift(newData);
    },
    deleteEvent(state, action: PayloadAction<any>) {
      state.forEach(
        st => st.id === action.payload && state.splice(state.indexOf(st), 1),
      );
    },
    updateEvent(state, action: PayloadAction<any>) {
      const newArray = state.findIndex(st => st.id === action.payload.id);
      state[newArray] = { ...action.payload };
    },
  },
});

export const { actions: eventsActions } = slice;

export const useEventsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: eventsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useEventsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
