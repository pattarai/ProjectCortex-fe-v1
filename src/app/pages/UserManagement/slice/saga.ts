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
    const res = yield call(() => axiosGet('/usermanagement'));
    const data = res.data.data;
    yield put(actions.setUser(data));
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateUser(action: any) {
  try {
    yield call(() => axiosPatch('/usermanagement', action.payload));
    yield put(actions.setUpdateUser(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* handleAddUser(action: any) {
  try {
    console.log(action.payload);
    const res = yield call(() => axiosPost('/usermanagement', action.payload));
    const data = res.data.data;
    yield put(actions.setUser(data));
  } catch (error) {
    console.log(error);
  }
}

function* handleDeleteUser(action: any) {
  try {
    console.log(action.payload);
    yield call(() => axiosDelete('/usermanagement', { uid: action.payload }));
    yield put(actions.setDeleteUser(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* userManagementSaga() {
  yield takeLatest(actions.getUser.type, handleGetUser);
  yield takeLatest(actions.addUser.type, handleAddUser);
  yield takeLatest(actions.updateUser.type, handleUpdateUser);
  yield takeLatest(actions.deleteUser.type, handleDeleteUser);
}
