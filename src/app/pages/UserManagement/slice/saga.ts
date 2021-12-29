import { call, put, takeLatest } from 'redux-saga/effects';
import { userManagementActions as actions } from '.';
import { axiosGet } from '../../../requests';

function* handleGetUser() {
  try {
    const res = yield call(() => axiosGet('/usermanagement'));
    const data = res.data.data;
    yield put(actions.setUser(data));
  } catch (error) {
    console.log(error);
  }
}

export function* userManagementSaga() {
  yield takeLatest(actions.getUser.type, handleGetUser);
}
