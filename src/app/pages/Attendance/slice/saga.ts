import { takeLatest, call, put } from 'redux-saga/effects';
import { attendanceActions as actions } from '.';
import { axiosPatch, axiosPost } from '../../../requests';

function* handleGetAttendance(action: any) {
  try {
    const { data } = yield call(() =>
      axiosPost('/admin/attendance/get', action.payload),
    );
    yield put(actions.setInitialData(data));
  } catch (error) {
    yield put(actions.setError(true));
  }
}

function* handleUpdateAttendance(action: any) {
  try {
    if (action.payload.isExist) {
      yield call(() => axiosPatch('/admin/attendance', action.payload));
    } else {
      yield call(() => axiosPost('/admin/attendance', action.payload));
    }
  } catch (error) {
    yield put(actions.setError(true));
  }
}

export function* attendanceSaga() {
  yield takeLatest(actions.getAttendance.type, handleGetAttendance);
  yield takeLatest(actions.updateAttendance.type, handleUpdateAttendance);
}
