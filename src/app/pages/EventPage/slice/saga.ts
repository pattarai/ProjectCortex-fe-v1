// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { sliceActions as actions } from '.';

// function* doSomething() {}

import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { eventsActions as actions } from '.';
import {
  axiosGet,
  axiosPatch,
  axiosPost,
  axiosDelete,
} from '../../../requests';
export function* sliceSaga() {
  // yield takeLatest(actions.someAction.type, doSomething);
}

function* handleGetUser() {
  try {
    const res = yield call(() => axiosGet('/admin/events'));
    const data = res.data.data;
    console.log(data);
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleAddUser(action: any) {
  try {
    const res = yield call(() => axiosPost('/events', action.payload));
    const data = res.data;
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleUpdateUser(action: any) {
  try {
    yield call(() => axiosPatch('/events', action.payload));
    yield put(actions.setUpdateEvent(action.payload));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleDeleteUser(action: any) {
  try {
    yield call(() => axiosDelete('/events', { event_id: action.payload }));
    yield put(actions.setDeleteEvent(action.payload));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

export function* eventsSaga() {
  yield takeLatest(actions.getEvent.type, handleGetUser);
  yield takeLatest(actions.addEvent.type, handleAddUser);
  yield takeLatest(actions.updateEvent.type, handleUpdateUser);
  yield takeLatest(actions.deleteEvent.type, handleDeleteUser);
}
