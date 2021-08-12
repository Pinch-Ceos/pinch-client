import { HYDRATE } from 'next-redux-wrapper';
import produce from 'immer';

const initalState = {
  me: null,
  mails: [],
  sender_list: [],
  loading: false,
  modalScroll: null,
  view: null,
  viewInfo: null,
  num_of_email: null,
  hasMoreMails: true,
  auth_uri: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  giveCodeLoading: false,
  giveCodeDone: false,
  giveCodeError: null,
  loadSenderLoading: false,
  loadSenderDone: false,
  loadSenderError: null,
  loadSubscriptionLoading: false,
  loadSubscriptionDone: false,
  loadSubscriptionError: null,
  loadMailLoading: false,
  loadMailDone: false,
  loadMailError: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadDetailLoading: false,
  loadDetailDone: false,
  loadDetailError: null,
  deleteSubcriptionLoading: false,
  deleteSubcriptionDone: false,
  deleteSubcriptionError: null,
  addBookmarkLoading: false,
  addBookmarkDone: false,
  addBookmarkError: null,
  deleteBookmarkLoading: false,
  deleteBookmarkDone: false,
  deleteBookmarkError: null,
  loadDetailInfoLoading: false,
  loadDetailInfoDone: false,
  loadDetailInfoError: null,
  deleteUserLoading: false,
  deleteUserDone: false,
  deleteUserError: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const GIVE_CODE_REQUEST = 'GIVE_CODE_REQUEST';
export const GIVE_CODE_SUCCESS = 'GIVE_CODE_SUCCESS';
export const GIVE_CODE_FAILURE = 'GIVE_CODE_FAILURE';

export const LOAD_SENDER_REQUEST = 'LOAD_SENDER_REQUEST';
export const LOAD_SENDER_SUCCESS = 'LOAD_SENDER_SUCCESS';
export const LOAD_SENDER_FAILURE = 'LOAD_SENDER_FAILURE';

export const LOAD_SUBSCRIPTION_REQUEST = 'LOAD_SUBSCRIPTION_REQUEST';
export const LOAD_SUBSCRIPTION_SUCCESS = 'LOAD_SUBSCRIPTION_SUCCESS';
export const LOAD_SUBSCRIPTION_FAILURE = 'LOAD_SUBSCRIPTION_FAILURE';

export const LOAD_MAIL_REQUEST = 'LOAD_MAIL_REQUEST';
export const LOAD_MAIL_SUCCESS = 'LOAD_MAIL_SUCCESS';
export const LOAD_MAIL_FAILURE = 'LOAD_MAIL_FAILURE';

export const LOAD_SEARCH_MAIL_REQUEST = 'LOAD_SEARCH_MAIL_REQUEST';
export const LOAD_SEARCH_MAIL_SUCCESS = 'LOAD_SEARCH_MAIL_SUCCESS';
export const LOAD_SEARCH_MAIL_FAILURE = 'LOAD_SEARCH_MAIL_FAILURE';

export const LOAD_BOOKMARK_REQUEST = 'LOAD_BOOKMARK_REQUEST';
export const LOAD_BOOKMARK_SUCCESS = 'LOAD_BOOKMARK_SUCCESS';
export const LOAD_BOOKMARK_FAILURE = 'LOAD_BOOKMARK_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_DETAIL_REQUEST = 'LOAD_DETAIL_REQUEST';
export const LOAD_DETAIL_SUCCESS = 'LOAD_DETAIL_SUCCESS';
export const LOAD_DETAIL_FAILURE = 'LOAD_DETAIL_FAILURE';

export const LOAD_DETAIL_INFO_REQUEST = 'LOAD_DETAIL_INFO_REQUEST';
export const LOAD_DETAIL_INFO_SUCCESS = 'LOAD_DETAIL_INFO_SUCCESS';
export const LOAD_DETAIL_INFO_FAILURE = 'LOAD_DETAIL_INFO_FAILURE';

export const DELETE_SUBSCRIPTION_REQUEST = 'DELETE_SUBSCRIPTION_REQUEST';
export const DELETE_SUBSCRIPTION_SUCCESS = 'DELETE_SUBSCRIPTION_SUCCESS';
export const DELETE_SUBSCRIPTION_FAILURE = 'DELETE_SUBSCRIPTION_FAILURE';

export const ADD_BOOKMARK_REQUEST = 'ADD_BOOKMARK_REQUEST';
export const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS';
export const ADD_BOOKMARK_FAILURE = 'ADD_BOOKMARK_FAILURE';

export const DELETE_BOOKMARK_REQUEST = 'DELETE_BOOKMARK_REQUEST';
export const DELETE_BOOKMARK_SUCCESS = 'DELETE_BOOKMARK_SUCCESS';
export const DELETE_BOOKMARK_FAILURE = 'DELETE_BOOKMARK_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const LOADING = 'LOADING';
export const SCROLLING = 'SCROLLING';

const rootReducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        return action.payload;
      case SCROLLING:
        draft.modalScroll = action.data;
        break;
      case LOADING:
        draft.loading = true;
        break;
      case LOAD_DETAIL_INFO_REQUEST:
        draft.loadDetailInfoLoading = true;
        draft.loadDetailInfoDone = false;
        draft.loadDetailInfoError = null;
        break;
      case LOAD_DETAIL_INFO_SUCCESS:
        draft.loadDetailInfoLoading = false;
        draft.loadDetailInfoDone = true;
        draft.viewInfo = action.data;
        break;
      case LOAD_DETAIL_INFO_FAILURE:
        draft.loadDetailInfoLoading = false;
        draft.loadDetailInfoError = action.error;
        break;
      case DELETE_BOOKMARK_REQUEST:
        draft.deleteBookmarkLoading = true;
        draft.deleteBookmarkDone = false;
        draft.deleteBookmarkError = null;
        break;
      case DELETE_BOOKMARK_SUCCESS:
        draft.deleteBookmarkLoading = false;
        draft.deleteBookmarkDone = true;
        if (draft.viewInfo) {
          draft.viewInfo.bookmark_id = null;
          break;
        }
        const delindex = draft.mails.findIndex(
          (mail) => mail.bookmark_id === action.data
        );
        draft.mails[delindex].bookmark_id = null;
        break;
      case DELETE_BOOKMARK_FAILURE:
        draft.deleteBookmarkLoading = false;
        draft.deleteBookmarkError = action.error;
        break;
      case ADD_BOOKMARK_REQUEST:
        draft.addBookmarkLoading = true;
        draft.addBookmarkDone = false;
        draft.addBookmarkError = null;
        break;
      case ADD_BOOKMARK_SUCCESS:
        draft.addBookmarkLoading = false;
        draft.addBookmarkDone = true;
        if (draft.viewInfo) {
          draft.viewInfo.bookmark_id = action.data.id;
          break;
        }
        const addindex = draft.mails.findIndex(
          (mail) => mail.id === action.data.email_id
        );
        draft.mails[addindex].bookmark_id = action.data.id;
        break;
      case ADD_BOOKMARK_FAILURE:
        draft.addBookmarkLoading = false;
        draft.addBookmarkError = action.error;
        break;
      case LOAD_DETAIL_REQUEST:
        draft.loadDetailLoading = true;
        draft.loadDetailDone = false;
        draft.loadDetailError = null;
        break;
      case LOAD_DETAIL_SUCCESS:
        draft.loadDetailLoading = false;
        draft.loadDetailDone = true;
        draft.view = action.data;
        break;
      case LOAD_DETAIL_FAILURE:
        draft.loadDetailLoading = false;
        draft.loadDetailError = action.error;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case LOAD_SEARCH_MAIL_REQUEST:
      case LOAD_MAIL_REQUEST:
      case LOAD_BOOKMARK_REQUEST:
        draft.loadMailLoading = true;
        draft.loadMailDone = false;
        draft.loadMailError = null;
        break;
      case LOAD_BOOKMARK_SUCCESS:
        draft.loadMailLoading = false;
        draft.loadMailDone = true;
        draft.mails = draft.mails.concat(action.data);
        draft.hasMoreMails =
          action.data.length === 12 && draft.mails.length < 500;
        break;
      case LOAD_SEARCH_MAIL_SUCCESS:
      case LOAD_MAIL_SUCCESS:
        draft.loadMailLoading = false;
        draft.loadMailDone = true;
        draft.mails = draft.mails.concat(action.data.email_list);
        draft.num_of_email = action.data.num_of_email;
        draft.hasMoreMails =
          action.data.email_list.length === 12 && draft.mails.length < 500;
        break;
      case LOAD_SEARCH_MAIL_FAILURE:
      case LOAD_MAIL_FAILURE:
      case LOAD_BOOKMARK_FAILURE:
        draft.loadMailLoading = false;
        draft.loadMailError = action.error;
        break;
      case LOAD_SUBSCRIPTION_REQUEST:
        draft.loadSubscriptionLoading = true;
        draft.loadSubscriptionDone = false;
        draft.loadSubscriptionError = null;
        break;
      case LOAD_SUBSCRIPTION_SUCCESS:
        draft.loadSubscriptionLoading = false;
        draft.loadSubscriptionDone = true;
        draft.me.subscriptions = action.data.subscriptions;
        break;
      case LOAD_SUBSCRIPTION_FAILURE:
        draft.loadSubscriptionLoading = false;
        draft.loadSubscriptionError = action.error;
        break;
      case DELETE_SUBSCRIPTION_REQUEST:
        draft.loadSubscriptionLoading = true;
        draft.loadSubscriptionDone = false;
        draft.loadSubscriptionError = null;
        break;
      case DELETE_SUBSCRIPTION_SUCCESS:
        draft.loadSubscriptionLoading = false;
        draft.loadSubscriptionDone = true;
        draft.me.subscriptions = draft.me.subscriptions.filter(
          (value) => value.id !== action.data
        );
        break;
      case DELETE_SUBSCRIPTION_FAILURE:
        draft.loadSubscriptionLoading = false;
        draft.loadSubscriptionError = action.error;
        break;
      case LOAD_SENDER_REQUEST:
        draft.loadSenderLoading = true;
        draft.loadSenderDone = false;
        draft.loadSenderError = null;
        break;
      case LOAD_SENDER_SUCCESS:
        draft.loadSenderLoading = false;
        draft.loadSenderDone = true;
        draft.sender_list = action.data;
        break;
      case LOAD_SENDER_FAILURE:
        draft.loadSenderLoading = false;
        draft.loadSenderError = action.error;
        break;
      case GIVE_CODE_REQUEST:
        draft.giveCodeLoading = true;
        draft.giveCodeDone = false;
        draft.giveCodeError = null;
        break;
      case GIVE_CODE_SUCCESS:
        draft.giveCodeLoading = false;
        draft.giveCodeDone = true;
        draft.me = action.data;
        break;
      case GIVE_CODE_FAILURE:
        draft.giveCodeLoading = false;
        draft.giveCodeError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.auth_uri = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case DELETE_USER_REQUEST:
        draft.deleteUserLoading = true;
        draft.deleteUserDone = false;
        draft.deleteUserError = null;
        break;
      case DELETE_USER_SUCCESS:
        draft.deleteUserLoading = false;
        draft.deleteUserDone = true;
        break;
      case DELETE_USER_FAILURE:
        draft.deleteUserLoading = false;
        draft.deleteUserError = action.error;
        break;
      default:
        break;
    }
  });

export default rootReducer;
