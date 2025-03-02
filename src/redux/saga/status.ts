import toast from 'react-hot-toast';
import { takeLatest, select, put } from 'redux-saga/effects';

import { StatusSlice, setErrorMessage } from '../slices/statusSlice';

function* watchSetErrorMessage() {
  yield takeLatest(setErrorMessage.type, function* toastError() {
    const statusState: StatusSlice = yield select((state) => state.status);

    if (statusState.error) toast.error(statusState.error);
    else yield put(setErrorMessage(null));
  });
}

export { watchSetErrorMessage };
