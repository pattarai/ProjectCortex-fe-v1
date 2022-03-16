import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { rankingAdminSaga } from './saga';
import { RankingAdminState, Factor, Ranking } from './types';

export const initialState: RankingAdminState = {
  factors: new Array<Factor>(),
  ranking: new Array<Ranking>(),
};

const slice = createSlice({
  name: 'rankingAdmin',
  initialState,
  reducers: {
    getFactors: () => {},
    getRanking: () => {},

    deleteFactor: (state, action: PayloadAction<any>) => {},

    addFactor: (state, action: PayloadAction<any>) => {},
    addRanking: (state, action: PayloadAction<any>) => {},

    updateFactor: (state, action: PayloadAction<any>) => {},
    updateRanking: (state, action: PayloadAction<any>) => {},

    setFactors: (state, action: PayloadAction<any>) => {
      state.factors.splice(0, state.factors.length);
      state.factors.push(...action.payload);
    },
    setRanking: (state, action: PayloadAction<any>) => {
      state.ranking.splice(0, state.ranking.length);
      state.ranking.push(...action.payload);
    },

    addNewFactor: (state, action: PayloadAction<any>) => {
      state.factors.push(action.payload);
    },

    setUpdateFactor: (state, action: PayloadAction<any>) => {
      const newArray = state.factors.findIndex(
        st => st.factorId === action.payload.factorId,
      );
      state.factors[newArray] = { ...action.payload };
    },
    setDeleteFactor: (state, action: PayloadAction<any>) => {
      const deletedFactor = action.payload;
      console.log('data :', deletedFactor);
      state.factors.forEach(
        st =>
          st.factorId === deletedFactor.factorId &&
          state.factors.splice(state.factors.indexOf(st), 1),
      );

      state.ranking.forEach(
        rank =>
          rank.factor.factorId === deletedFactor.factorId &&
          state.ranking.splice(state.ranking.indexOf(rank), 1),
      );
    },
  },
});

export const { actions: rankingAdminActions } = slice;

export const useRankingAdminSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: rankingAdminSaga });
  return { actions: slice.actions };
};
