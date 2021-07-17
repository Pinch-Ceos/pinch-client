import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import faker from 'faker';
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
  SUBSCRIBTION_LIST_REQUEST,
  SUBSCRIBTION_LIST_SUCCESS,
  SUBSCRIBTION_LIST_FAILURE,
  LOAD_MAIL_REQUEST,
  LOAD_MAIL_SUCCESS,
  LOAD_MAIL_FAILURE,
  generateDummySendList,
  generateDummyMail,
} from '../reducers';

function logInAPI() {
  return axios.get('http://127.0.0.1:8000/auth/login');
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    // yield delay(1000);
    // const result = { data: 'http://localhost:3000/redirect' };
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
  return axios.get(`http://127.0.0.1:8000/auth/callback?code=${data}`);
}
function* giveCode(action) {
  try {
    const result = yield call(giveCodeAPI, action.data);
    // yield delay(1000);
    // const result = {
    //   data: {
    //     token:
    //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTB9.x6yM3zZn0dtSLhKjP_pYBzLy9aOJkWru0dotJjZG1PE',
    //     user_email_address: 'asd@asd',
    //     user_name: 'asd',
    //     subscribe_list: [
    //       {
    //         name: 'NEWNEEK',
    //         email_address: 'whatsup@newneek.co',
    //       },
    //       {
    //         name: 'UPPITY',
    //         email_address: 'moneyletter@uppity.co.kr',
    //       },
    //       {
    //         name: '디독',
    //         email_address: 'd.dok.newsletter@gmail.com',
    //       },
    //     ],
    //   },
    // };
    console.log(result);
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
function senderListAPI(token) {
  return axios.get('http://127.0.0.1:8000/user/email-senders', {
    headers: { Authorization: token },
  });
}
function* senderList(action) {
  try {
    const result = yield call(senderListAPI, action.token);
    // yield delay(1000);
    yield put({
      type: SENDER_LIST_SUCCESS,
      // data: generateDummySendList(12),
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SENDER_LIST_FAILURE,
      error: err.response,
    });
  }
}

function subscribtionListAPI(data, token) {
  return axios.post(
    'http://127.0.0.1:8000/subscribtions',
    {
      headers: { 'Content-Type': 'application/json', Authorization: token },
    },
    data
  ); //이거 api 어떻게 넘기는지
}
function* subscribtionList(action) {
  try {
    const result = yield call(subscribtiListAPI, action.data, action.token);
    // yield delay(1000);
    // const result = {
    //   data: [
    //     {
    //       name: 'NEWNEEK',
    //       email_address: 'whatsup@newneek.co',
    //     },
    //     {
    //       name: 'UPPITY',
    //       email_address: 'moneyletter@uppity.co.kr',
    //     },
    //     {
    //       name: '디독',
    //       email_address: 'd.dok.newsletter@gmail.com',
    //     },
    //     {
    //       name: 'ddddd',
    //       email_address: 'letter@gmail.com',
    //     },
    //   ],
    // };
    yield put({
      type: SUBSCRIBTION_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SUBSCRIBTION_LIST_FAILURE,
      error: err.response,
    });
  }
}

function loadMailAPI(data, token) {
  return axios.get(`http://127.0.0.1:8000/email?subscription=${data}`, {
    headers: { Authorization: token },
  });
}
function* loadMail(action) {
  try {
    const result = yield call(loadMailAPI, action.data, action.token);
    // yield delay(1000);
    yield put({
      type: LOAD_MAIL_SUCCESS,
      // data: generateDummyMail(12),
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MAIL_FAILURE,
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
  yield takeLatest(SENDER_LIST_REQUEST, senderList);
}
function* watchSubscribtionList() {
  yield takeLatest(SUBSCRIBTION_LIST_REQUEST, subscribtionList);
}
function* watchLoadMail() {
  yield takeLatest(LOAD_MAIL_REQUEST, loadMail);
}
export default function* rootSaga() {
  yield all([
    fork(watchLoadMail),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchGiveCode),
    fork(watchSenderList),
    fork(watchSubscribtionList),
  ]);
}
