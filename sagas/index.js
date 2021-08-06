import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
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
  DELETE_SUBSCRIPTION_REQUEST,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_FAILURE,
  LOAD_MAIL_REQUEST,
  LOAD_MAIL_SUCCESS,
  LOAD_MAIL_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_BOOKMARK_REQUEST,
  LOAD_BOOKMARK_SUCCESS,
  LOAD_BOOKMARK_FAILURE,
  LOAD_DETAIL_REQUEST,
  LOAD_DETAIL_SUCCESS,
  LOAD_DETAIL_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_FAILURE,
  DELETE_BOOKMARK_REQUEST,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_FAILURE,
  LOAD_DETAIL_INFO_REQUEST,
  LOAD_DETAIL_INFO_SUCCESS,
  LOAD_DETAIL_INFO_FAILURE,
  LOAD_SEARCH_MAIL_REQUEST,
  LOAD_SEARCH_MAIL_SUCCESS,
  LOAD_SEARCH_MAIL_FAILURE,
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
    yield put({
      type: LOAD_SENDER_SUCCESS,
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

function deleteSubscriptionAPI(action) {
  return axios.delete(`/subscriptions/${action.data}/`, {
    headers: { Authorization: action.token },
  });
}

function* deleteSubscription(action) {
  try {
    yield call(deleteSubscriptionAPI, action);
    yield put({
      type: DELETE_SUBSCRIPTION_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_SUBSCRIPTION_FAILURE,
      error: err.response,
    });
  }
}

function loadMailAPI(action) {
  return axios.get(
    `/email?subscription=${action.data}&page=${action.page}&unread=${action.read}`,
    {
      headers: { Authorization: action.token },
    }
  );
}
function* loadMail(action) {
  try {
    const result = yield call(loadMailAPI, action);
    yield put({
      type: LOAD_MAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MAIL_FAILURE,
      error: err.response,
    });
  }
}
function loadSearchMailAPI(action) {
  return axios.get(
    `/email?search=${encodeURIComponent(action.data)}&page=${action.page}`,
    {
      headers: { Authorization: action.token },
    }
  );
}
function* loadSearchMail(action) {
  try {
    const result = yield call(loadSearchMailAPI, action);
    yield put({
      type: LOAD_SEARCH_MAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_SEARCH_MAIL_FAILURE,
      error: err.response,
    });
  }
}
function loadBookmarkAPI(action) {
  return axios.get(`/email/bookmark?page=${action.page}`, {
    headers: { Authorization: action.token },
  });
}
function* loadBookmark(action) {
  try {
    const result = yield call(loadBookmarkAPI, action);
    yield put({
      type: LOAD_BOOKMARK_SUCCESS,
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
  return axios.get(`/email/detail?email_id=${data}`, {
    headers: { Authorization: token },
  });
}
function* loadDetail(action) {
  try {
    const result = yield call(loadDetailAPI, action.data, action.token);
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
function addBookmarkAPI(action) {
  return axios.post(
    `/bookmarks/`,
    { email_id: action.data },
    {
      headers: { Authorization: action.token },
    }
  );
}
function* addBookmark(action) {
  try {
    const result = yield call(addBookmarkAPI, action);
    console.log(result);
    yield put({
      type: ADD_BOOKMARK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_BOOKMARK_FAILURE,
      error: err.response,
    });
  }
}
function deleteBookmarkAPI(action) {
  return axios.delete(`/bookmarks/${action.data}/`, {
    headers: { Authorization: action.token },
  });
}
function* deleteBookmark(action) {
  try {
    const result = yield call(deleteBookmarkAPI, action);
    console.log(result);
    yield put({
      type: DELETE_BOOKMARK_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: DELETE_BOOKMARK_FAILURE,
      error: err.response,
    });
  }
}
function loadDetailInfoAPI(action) {
  return axios.get(`/email/detail/info?email_id=${action.data}`, {
    headers: { Authorization: action.token },
  });
}
function* loadDetailInfo(action) {
  try {
    const result = yield call(loadDetailInfoAPI, action);
    console.log(result);
    yield put({
      type: LOAD_DETAIL_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_DETAIL_INFO_FAILURE,
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
function* watchLoadSearchMail() {
  yield takeLatest(LOAD_SEARCH_MAIL_REQUEST, loadSearchMail);
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
function* watchDeleteSubscription() {
  yield takeLatest(DELETE_SUBSCRIPTION_REQUEST, deleteSubscription);
}
function* watchAddBookmark() {
  yield takeLatest(ADD_BOOKMARK_REQUEST, addBookmark);
}
function* watchDeleteBookmark() {
  yield takeLatest(DELETE_BOOKMARK_REQUEST, deleteBookmark);
}
function* watchLoadDetailInfo() {
  yield takeLatest(LOAD_DETAIL_INFO_REQUEST, loadDetailInfo);
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
    fork(watchLoadDetailInfo),
    fork(watchDeleteSubscription),
    fork(watchAddBookmark),
    fork(watchDeleteBookmark),
    fork(watchLoadSearchMail),
  ]);
}
