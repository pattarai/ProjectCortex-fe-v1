import { call, put, takeLatest } from 'redux-saga/effects';
import { rankingAdminActions as actions } from '.';
import {
  axiosDelete,
  axiosGet,
  axiosPatch,
  axiosPost,
} from '../../../requests';

// Factors Handler
function* handleGetFactors() {
  try {
    const res = yield call(() => axiosGet('/admin/factors'));
    const data = res.data.getFactors;
    yield put(actions.setFactors(data));
  } catch (error) {
    console.log(error);
  }
}

function* handlePostFactor(action: any) {
  /**
   * action.payload {
   *    factorName: string
   *    maxScore: number
   *    phase: number
   * }
   */
  try {
    const res = yield call(() => axiosPost('/admin/factors', action.payload));
    const postFactors = res.data.postFactors;
    const postRanks = res.data.postRanks;
    yield put(actions.addNewFactor(postFactors));
    yield put(actions.setRanking(postRanks));
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateFactor(action: any) {
  /**
   * action.payload {
   *    factorId: number
   *    factorName: string
   *    maxScore: number
   *    phase: number
   * }
   */
  try {
    yield call(() => axiosPatch('/admin/factors', action.payload));
    yield put(actions.setUpdateFactor(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* handleDeleteFactor(action: any) {
  /**
   * action.payload {
   *    factorId: number
   * }
   */
  try {
    const res = yield call(() => axiosDelete('/admin/factors', action.payload));
    const deletedFactors = res.data.deleteFactors;
    yield put(actions.setDeleteFactor(deletedFactors));
  } catch (error) {
    console.log(error);
  }
}

// Ranking Handler
function* handleGetRanking() {
  try {
    const res = yield call(() => axiosGet('/admin/ranks'));
    const data = res.data.ranks;
    yield put(actions.setRanking(data));
  } catch (error) {
    console.log(error);
  }
}

function* handlePatchRanking(action: any) {
  /**
   * action.payload {
   *    crewScore: [
   *       userId: number
   *       factorId: number
   *       score: number
   *  ]
   * }
   */
  try {
    yield call(() => axiosPatch('/admin/ranks', action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* rankingAdminSaga() {
  yield takeLatest(actions.getFactors.type, handleGetFactors);
  yield takeLatest(actions.getRanking.type, handleGetRanking);
  yield takeLatest(actions.addFactor.type, handlePostFactor);
  yield takeLatest(actions.updateFactor.type, handleUpdateFactor);
  yield takeLatest(actions.deleteFactor.type, handleDeleteFactor);
  yield takeLatest(actions.updateRanking.type, handlePatchRanking);
}
