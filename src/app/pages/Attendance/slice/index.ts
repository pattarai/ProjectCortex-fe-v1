import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { attendanceSaga } from './saga';
import { AttendanceState } from './types';

export const initialState: AttendanceState = {
  error: false,
  crewAttendance: [],
  externalAttendance: [],
  eventId: 0,
  isExist: false,
};

const slice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    getAttendance(state, action: PayloadAction<any>) {},
    updateAttendance(state, action: PayloadAction<any>) {},

    setInitialData(state, action: PayloadAction<any>) {
      const { crewAttendance, externalAttendance, eventId, isExist } =
        action.payload;
      state.crewAttendance = crewAttendance;
      if (externalAttendance) {
        state.externalAttendance = externalAttendance;
      }
      state.eventId = eventId;
      state.isExist = isExist;
    },

    addExternalMember(state, action: PayloadAction<any>) {
      state.externalAttendance.push(action.payload);
    },

    deleteExternalMember(state, action: PayloadAction<any>) {
      const deleteIndex = state.externalAttendance.findIndex(
        item => item.externalId === action.payload.externalId,
      );
      state.externalAttendance.splice(deleteIndex, 1);
    },

    updateCrewMember(state, action: PayloadAction<any>) {
      const updateIndex = state.crewAttendance.findIndex(
        item => item.userId === action.payload.userId,
      );
      state.crewAttendance[updateIndex].status = action.payload.status;
    },

    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
  },
});

export const { actions: attendanceActions } = slice;

export const useAttendanceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: attendanceSaga });
  return { actions: slice.actions };
};
