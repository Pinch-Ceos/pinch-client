import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  GIVE_CODE_REQUEST,
  GIVE_CODE_SUCCESS,
  GIVE_CODE_FAILURE,
  SUBSCRIBTION_LIST_REQUEST,
  SUBSCRIBTION_LIST_SUCCESS,
  SUBSCRIBTION_LIST_FAILURE,
  generateDummySubList,
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
function subscribtionListAPI() {
  return axios.get('api/subscribtionlist');
}
function* subscribtionList() {
  try {
    // const result = yield call(subscribtionListAPI);
    yield delay(1000);
    console.log('sub');
    const result = generateDummySubList();
    console.log(result);
    yield put({
      type: SUBSCRIBTION_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SUBSCRIBTION_LIST_FAILURE,
      error: err.response.data,
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
function* watchSubscribtionList() {
  yield takeLatest(SUBSCRIBTION_LIST_REQUEST, subscribtionList);
}
export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchGiveCode),
    fork(watchSubscribtionList),
  ]);
}
