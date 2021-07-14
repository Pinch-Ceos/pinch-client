import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  GIVE_CODE_REQUEST,
  GIVE_CODE_SUCCESS,
  GIVE_CODE_FAILURE,
  SENDER_LIST_REQUEST,
  SENDER_LIST_SUCCESS,
  SENDER_LIST_FAILURE,
  generateDummySendList,
} from '../reducers';

function logInAPI() {
  return axios.get('http://127.0.0.1:8000/auth/login');
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    const result = { data: 'http://localhost:3000/redirect' };
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function giveCodeAPI(data) {
  console.log(data);
  return axios.get(`http://127.0.0.1:8000/callback?code=${data}`);
}
function* giveCode(action) {
  try {
    // const result = yield call(giveCodeAPI, action.data);
    yield delay(1000);
    const result = {
      data: {
        user_email_address: 1,
        user_name: 1,
        subscribe_list: [],
      },
    };
    yield put({
      type: GIVE_CODE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GIVE_CODE_FAILURE,
      error: err.response.data,
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
      error: err.response.data,
    });
  }
}
function senderListAPI() {
  return axios.get('api/user/email-sender-list');
}
function* senderList() {
  try {
    // const result = yield call(subscribtionListAPI);
    yield delay(1000);
    console.log('sub');
    // const result = generateDummySubList(10);
    const result = generateDummySendList;
    console.log(result);
    yield put({
      type: SENDER_LIST_SUCCESS,
      data: result,
    });
  } catch (err) {
    yield put({
      type: SENDER_LIST_FAILURE,
      error: err.response,
    });
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}
function* watchGiveCode() {
  yield takeLatest(GIVE_CODE_REQUEST, giveCode);
}
function* watchSenderList() {
  yield takeLatest(SENDER_LIST_REQUEST, SenderList);
}
export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchGiveCode),
    fork(watchSenderList),
  ]);
}
