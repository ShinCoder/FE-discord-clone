import { put, takeLatest } from 'redux-saga/effects';

import { clearAuthState } from '../slices/authSlice';
import { resetModals } from '../slices/modalSlice';

function* watchClearAuthState() {
  yield takeLatest(clearAuthState.type, function* cleanUp() {
    yield put(resetModals());
  });
}

export { watchClearAuthState };
