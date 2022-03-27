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
    yield put(actions.setFactorsLoading(true));
    const res = yield call(() => axiosGet('/admin/factors'));
    const data = res.data.getFactors;
    yield put(actions.setFactors(data));
    yield put(actions.setFactorsLoading(false));
  } catch (error) {}
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
    yield put(actions.setFactorsLoading(true));
    const res = yield call(() => axiosPost('/admin/factors', action.payload));
    const postFactors = res.data.postFactors;
    yield put(actions.addNewFactor(postFactors));
    yield put(actions.getRanking());
    yield put(actions.setFactorsLoading(false));
  } catch (error) {}
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
    yield put(actions.setFactorsLoading(true));
    yield call(() => axiosPatch('/admin/factors', action.payload));
    yield put(actions.setUpdateFactor(action.payload));
    yield put(actions.setFactorsLoading(false));
  } catch (error) {}
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
    yield put(actions.setFactorsLoading(false));
  } catch (error) {}
}

// Ranking Handler
function* handleGetRanking() {
  try {
    yield put(actions.setRankingLoading(true));
    const res = yield call(() => axiosGet('/admin/ranks'));
    const data = res.data.ranks;
    yield put(actions.setRanking(data));
    yield put(actions.setRankingLoading(false));
  } catch (error) {}
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
    yield put(actions.setRankingLoading(true));
    yield call(() => axiosPatch('/admin/ranks', action.payload));
    yield put(actions.setRankingLoading(false));
  } catch (error) {}
}

export function* rankingAdminSaga() {
  yield takeLatest(actions.getFactors.type, handleGetFactors);
  yield takeLatest(actions.getRanking.type, handleGetRanking);
  yield takeLatest(actions.addFactor.type, handlePostFactor);
  yield takeLatest(actions.updateFactor.type, handleUpdateFactor);
  yield takeLatest(actions.deleteFactor.type, handleDeleteFactor);
  yield takeLatest(actions.updateRanking.type, handlePatchRanking);
}
