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
        user_email_address: 'asd@asd',
        user_name: 'asd',
        subscribe_list: [
          {
            name: 'NEWNEEK',
            email_address: 'whatsup@newneek.co',
          },
          {
            name: 'UPPITY',
            email_address: 'moneyletter@uppity.co.kr',
          },
          {
            name: '디독',
            email_address: 'd.dok.newsletter@gmail.com',
          },
        ],
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
    // const result = yield call(senderListAPI);
    yield delay(1000);
    yield put({
      type: SENDER_LIST_SUCCESS,
      data: generateDummySendList(12),
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SENDER_LIST_FAILURE,
      error: err.response,
    });
  }
}

function subscribtionListAPI(data) {
  return axios.post('api/user/subscribtions',data); //이거 api 어떻게 넘기는지
}
function* subscribtionList() {
  try {
    // const result = yield call(subscribtiListAPI);
    yield delay(1000);
    yield put({
      type: SUBSCRIBTION_LIST_SUCCESS,
      data: [
        {
          name: 'NEWNEEK',
          email_address: 'whatsup@newneek.co',
        },
        {
          name: 'UPPITY',
          email_address: 'moneyletter@uppity.co.kr',
        },
        {
          name: '디독',
          email_address: 'd.dok.newsletter@gmail.com',
        },
        {
          name: 'ddddd',
          email_address: 'letter@gmail.com',
        },
      ],
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SUBSCRIBTION_LIST_FAILURE,
      error: err.response,
    });
  }
}

function loadMailAPI(data) {
  return axios.get(`api/email?subscription=${data}`);
}
function* loadMail(action) {
  try {
    // const result = yield call(loadMailAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_MAIL_SUCCESS,
      data: generateDummyMail(12),
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
