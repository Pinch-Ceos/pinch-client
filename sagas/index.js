import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers';

function logInAPI(data) {
  return axios.get('api/login', data);
}

const dummyLogInAPI = {
  data: {
    name: '1',
    email: '2',
    subscribe: [1, 2, 3],
    bookmark: [1, 2, 3],
    token: 'asd',
  },
};

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    const result = dummyLogInAPI;
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}
function logOutAPI() {
  return axios.post('api/logout');
}
function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}
export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
