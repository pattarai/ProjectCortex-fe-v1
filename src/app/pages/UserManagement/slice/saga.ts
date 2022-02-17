import { call, put, takeLatest } from 'redux-saga/effects';
import { userManagementActions as actions } from '.';
import {
  axiosGet,
  axiosPatch,
  axiosPost,
  axiosDelete,
} from '../../../requests';

function* handleGetUser() {
  try {
    const res = yield call(() => axiosGet('/admin/user-management'));
    const data = res.data.user;
    yield put(actions.setUser(data));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleAddUser(action: any) {
  try {
    const res = yield call(() =>
      axiosPost('/admin/user-management', action.payload),
    );
    const data = res.data.data;
    yield put(actions.setUser(data));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleUpdateUser(action: any) {
  try {
    yield call(() => axiosPatch('/admin/user-management', action.payload));
    yield put(actions.setUpdateUser(action.payload));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleDeleteUser(action: any) {
  try {
    yield call(() =>
      axiosDelete('/admin/user-management', { uid: action.payload }),
    );
    yield put(actions.setDeleteUser(action.payload));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

export function* userManagementSaga() {
  yield takeLatest(actions.getUser.type, handleGetUser);
  yield takeLatest(actions.addUser.type, handleAddUser);
  yield takeLatest(actions.updateUser.type, handleUpdateUser);
  yield takeLatest(actions.deleteUser.type, handleDeleteUser);
}
