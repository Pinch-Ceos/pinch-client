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
  LOAD_SENDER_REQUEST,
  LOAD_SENDER_SUCCESS,
  LOAD_SENDER_FAILURE,
  LOAD_SUBSCRIPTION_REQUEST,
  LOAD_SUBSCRIPTION_SUCCESS,
  LOAD_SUBSCRIPTION_FAILURE,
  LOAD_MAIL_REQUEST,
  LOAD_MAIL_SUCCESS,
  LOAD_MAIL_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  generateDummySendList,
  generateDummyMail,
  LOAD_BOOKMARK_REQUEST,
  LOAD_BOOKMARK_SUCCESS,
  LOAD_BOOKMARK_FAILURE,
  LOAD_DETAIL_REQUEST,
  LOAD_DETAIL_SUCCESS,
  LOAD_DETAIL_FAILURE,
} from '../reducers';

import backUrl from '../config/config';
axios.defaults.baseURL = backUrl;
// axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

function logInAPI() {
  return axios.get(`/auth/login`);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    // yield delay(1000);
    // const result = { data: `http://localhost:3000/redirect` };
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
  console.log({ code: data });
  return axios.post(`/auth/callback?code=${data}/`, { code: data });
}
function* giveCode(action) {
  try {
    const result = yield call(giveCodeAPI, action.data);
    // yield delay(1000);
    // const result = {
    //   data: {
    //     user_name: '임해진',
    //     user_email_address: 'hj0816hj@gmail.com',
    //     subscriptions: [
    //       {
    //         id: 1,
    //         name: 'NEWNEEK',
    //         email_address: 'whatsup@newneek.co',
    //       },
    //       {
    //         id: 3,
    //         name: '뉴스레터 이름',
    //         email_address: '뉴스레터 이메일 주소',
    //       },
    //     ],
    //     subscription_num: 2,
    //     bookmark_num: 1,
    //   },
    // };
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
function loadSenderAPI(token) {
  return axios.get(`/user/email-senders`, {
    headers: { Authorization: token },
  });
}
function* loadSender(action) {
  try {
    const result = yield call(loadSenderAPI, action.token);
    // yield delay(1000);
    yield put({
      type: LOAD_SENDER_SUCCESS,
      // data: generateDummySendList(12),
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_SENDER_FAILURE,
      error: err.response,
    });
  }
}

function loadSubscriptionAPI(data, token) {
  console.log(data);
  return axios.post(`/subscriptions/`, data, {
    headers: { Authorization: token },
  }); //이거 api 어떻게 넘기는지
}
function* loadSubscription(action) {
  try {
    const result = yield call(loadSubscriptionAPI, action.data, action.token);
    // yield delay(1000);
    // const result = {
    //   data: {
    //     subscriptions: [
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
    //       {
    //         name: 'ddddd',
    //         email_address: 'letter@gmail.com',
    //       },
    //     ],
    //   },
    // };
    yield put({
      type: LOAD_SUBSCRIPTION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_SUBSCRIPTION_FAILURE,
      error: err.response,
    });
  }
}

function loadMailAPI(action) {
  return axios.get(`/email?subscription=${action.data}&page=${action.page}`, {
    headers: { Authorization: action.token },
  });
}
function* loadMail(action) {
  try {
    const result = yield call(loadMailAPI, action);
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
function loadBookmarkAPI(token) {
  return axios.get(`/email/bookmark?page=${0}`, {
    headers: { Authorization: token },
  });
}
function* loadBookmark(action) {
  try {
    const result = yield call(loadBookmarkAPI, action.token);
    // yield delay(1000);
    yield put({
      type: LOAD_BOOKMARK_SUCCESS,
      // data: generateDummyBOOKMARK(12),
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_BOOKMARK_FAILURE,
      error: err.response,
    });
  }
}
function loadMyInfoAPI(token) {
  return axios.get(`/user`, {
    headers: { Authorization: token },
  });
}
function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.token);
    // yield delay(1000);
    // const result = {
    //   data: {
    //     user_name: '임해진',
    //     user_email_address: 'hj0816hj@gmail.com',
    //     subscriptions: [
    //       {
    //         id: 1,
    //         name: 'NEWNEEK',
    //         email_address: 'whatsup@newneek.co',
    //       },
    //       {
    //         id: 3,
    //         name: '뉴스레터 이름',
    //         email_address: '뉴스레터 이메일 주소',
    //       },
    //     ],
    //     subscription_num: 2,
    //     bookmark_num: 1,
    //   },
    // };
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

function loadDetailAPI(data, token) {
  return axios.get(`/email?email_id=${data}`, {
    headers: { Authorization: token },
  });
}
function* loadDetail(action) {
  try {
    const result = yield call(loadDetailAPI, action.data, action.token);
    // yield delay(1000);
    yield put({
      type: LOAD_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_DETAIL_FAILURE,
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
function* watchLoadSender() {
  yield takeLatest(LOAD_SENDER_REQUEST, loadSender);
}
function* watchLoadSubscription() {
  yield takeLatest(LOAD_SUBSCRIPTION_REQUEST, loadSubscription);
}
function* watchLoadMail() {
  yield takeLatest(LOAD_MAIL_REQUEST, loadMail);
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchLoadBookmark() {
  yield takeLatest(LOAD_BOOKMARK_REQUEST, loadBookmark);
}
function* watchLoadDetail() {
  yield takeLatest(LOAD_DETAIL_REQUEST, loadDetail);
}
export default function* rootSaga() {
  yield all([
    fork(watchLoadMail),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchGiveCode),
    fork(watchLoadSender),
    fork(watchLoadSubscription),
    fork(watchLoadMyInfo),
    fork(watchLoadBookmark),
    fork(watchLoadDetail),
  ]);
}
