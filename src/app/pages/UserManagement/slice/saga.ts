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
    const { data } = yield call(() => axiosGet('/admin/user-management'));
    yield put(actions.setInitialData(data));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleAddUser(action: any) {
  try {
    const res = yield call(() =>
      axiosPost('/admin/user-management', action.payload),
    );
    const newId = res.data.user.userId;
    const { userId, ...rest } = action.payload;
    const payload = { userId: newId, ...rest };
    yield put(actions.setAddUser(payload));
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
      axiosDelete('/admin/user-management', { userId: action.payload }),
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
