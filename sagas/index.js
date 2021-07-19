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
  SUBSCRIPTION_LIST_REQUEST,
  SUBSCRIPTION_LIST_SUCCESS,
  SUBSCRIPTION_LIST_FAILURE,
  LOAD_MAIL_REQUEST,
  LOAD_MAIL_SUCCESS,
  LOAD_MAIL_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
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
  return axios.get(`http://127.0.0.1:8000/auth/callback?code=${data}`);
}
function* giveCode(action) {
  try {
    // const result = yield call(giveCodeAPI, action.data);
    yield delay(1000);
    const result = {
      data: {
        user_name: '임해진',
        user_email_address: 'hj0816hj@gmail.com',
        subscriptions: [
          {
            id: 1,
            name: 'NEWNEEK',
            email_address: 'whatsup@newneek.co',
          },
          {
            id: 3,
            name: '뉴스레터 이름',
            email_address: '뉴스레터 이메일 주소',
          },
        ],
        subscription_num: 2,
        bookmark_num: 1,
      },
    };
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
    // const result = yield call(senderListAPI, action.token);
    yield delay(1000);
    yield put({
      type: SENDER_LIST_SUCCESS,
      data: generateDummySendList(12),
      // data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SENDER_LIST_FAILURE,
      error: err.response,
    });
  }
}

function subscriptionListAPI(data, token) {
  return axios.post('http://127.0.0.1:8000/subscriptions', data, {
    headers: { 'Content-Type': 'application/json', Authorization: token },
  }); //이거 api 어떻게 넘기는지
}
function* subscriptionList(action) {
  try {
    // const result = yield call(
    //   subscriptionListAPI,
    //   action.data,
    //   action.token
    // );
    yield delay(1000);
    const result = {
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
    };
    yield put({
      type: SUBSCRIPTION_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SUBSCRIPTION_LIST_FAILURE,
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
    // const result = yield call(loadMailAPI, action.data, action.token);
    yield delay(1000);
    yield put({
      type: LOAD_MAIL_SUCCESS,
      data: generateDummyMail(12),
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MAIL_FAILURE,
      error: err.response,
    });
  }
}

function loadMyInfoAPI(token) {
  return axios.get('http://127.0.0.1:8000/user', {
    headers: { Authorization: token },
  });
}
function* loadMyInfo(action) {
  try {
    // const result = yield call(loadMyInfoAPI, action.data, action.token);
    yield delay(1000);
    const result = {
      data: {
        user_name: '임해진',
        user_email_address: 'hj0816hj@gmail.com',
        subscriptions: [
          {
            id: 1,
            name: 'NEWNEEK',
            email_address: 'whatsup@newneek.co',
          },
          {
            id: 3,
            name: '뉴스레터 이름',
            email_address: '뉴스레터 이메일 주소',
          },
        ],
        subscription_num: 2,
        bookmark_num: 1,
      },
    };
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
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
function* watchSubscriptionList() {
  yield takeLatest(SUBSCRIPTION_LIST_REQUEST, subscriptionList);
}
function* watchLoadMail() {
  yield takeLatest(LOAD_MAIL_REQUEST, loadMail);
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
export default function* rootSaga() {
  yield all([
    fork(watchLoadMail),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchGiveCode),
    fork(watchSenderList),
    fork(watchSubscriptionList),
    fork(watchLoadMyInfo),
  ]);
}
