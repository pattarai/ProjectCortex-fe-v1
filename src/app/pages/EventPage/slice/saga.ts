import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { eventsActions as actions } from '.';
import {
  axiosGet,
  axiosPatch,
  axiosPost,
  axiosDelete,
} from '../../../requests';

function* handleGetEvents() {
  try {
    const res = yield call(() => axiosGet('/admin/events'));
    const data = res.data;
    console.log(data);
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleAddEvents(action: any) {
  try {
    const res = yield call(() => axiosPost('/admin/events', action.payload));
    const data = res.data.data;
    yield put(actions.setEvent(data));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleUpdateEvents(action: any) {
  try {
    yield call(() => axiosPatch('/admin/events', action.payload));
    yield put(actions.setUpdateEvent(action.payload));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleDeleteEvents(action: any) {
  try {
    yield call(() => axiosDelete('/admin/events', { eventId: action.payload }));
    yield put(actions.setDeleteEvent(action.payload));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

export function* eventsSaga() {
  yield takeLatest(actions.getEvent.type, handleGetEvents);
  yield takeLatest(actions.addEvent.type, handleAddEvents);
  yield takeLatest(actions.updateEvent.type, handleUpdateEvents);
  yield takeLatest(actions.deleteEvent.type, handleDeleteEvents);
}
