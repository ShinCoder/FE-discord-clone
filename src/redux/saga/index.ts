import { all } from 'redux-saga/effects';

import { watchClearAuthState } from './auth';
import { watchSetErrorMessage } from './status';

const rootSaga = function* root() {
  yield all([watchClearAuthState()]);
  yield all([watchSetErrorMessage()]);
};

export default rootSaga;
