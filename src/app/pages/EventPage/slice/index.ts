import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { eventsSaga } from './saga';
import { EventsState } from './types';

export const initialState: EventsState = {
  error: false,
  events: [],
  projects: [],
  committee: [],
};

const slice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    getEvent() {},
    addEvent(state, action: PayloadAction<any>) {},
    updateEvent(state, action: PayloadAction<any>) {},
    deleteEvent(state, action: PayloadAction<any>) {},
    setEvent(state, action: PayloadAction<any>) {
      const { data, projectList, committeeList } = action.payload;
      state.events.push(...data);
      state.projects.push(...projectList);
      state.committee.push(...committeeList);
    },

    setUpdateEvent(state, action: PayloadAction<any>) {
      const newArray = state.events.findIndex(
        st => st.eventId === action.payload.uid,
      );
      state.events[newArray] = { ...action.payload };
    },

    setDeleteEvent(state, action: PayloadAction<any>) {
      state.events.forEach(
        st =>
          st.eventId === action.payload &&
          state.events.splice(state.events.indexOf(st), 1),
      );
    },

    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
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
