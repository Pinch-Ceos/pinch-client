import { HYDRATE } from 'next-redux-wrapper';
import produce from 'immer';
import faker from 'faker';

const initalState = {
  me: null,
  // email_address: null,
  // name: null,
  // token: null,
  // subscribe_list: [],
  mails: [],
  sender_list: [],
  view: null,
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

export const LOAD_BOOKMARK_REQUEST = 'LOAD_BOOKMARK_REQUEST';
export const LOAD_BOOKMARK_SUCCESS = 'LOAD_BOOKMARK_SUCCESS';
export const LOAD_BOOKMARK_FAILURE = 'LOAD_BOOKMARK_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_DETAIL_REQUEST = 'LOAD_DETAIL_REQUEST';
export const LOAD_DETAIL_SUCCESS = 'LOAD_DETAIL_SUCCESS';
export const LOAD_DETAIL_FAILURE = 'LOAD_DETAIL_FAILURE';

export const DELETE_SUBSCRIPTION_REQUEST = 'DELETE_SUBSCRIPTION_REQUEST';
export const DELETE_SUBSCRIPTION_SUCCESS = 'DELETE_SUBSCRIPTION_SUCCESS';
export const DELETE_SUBSCRIPTION_FAILURE = 'DELETE_SUBSCRIPTION_FAILURE';

export const generateDummyMail = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      name: faker.name.findName(),
      email_address: faker.internet.email(),
      datetime: faker.datatype.datetime(),
      subject: faker.name.title(),
      snippet: faker.lorem.paragraph(),
      image: faker.image.image(),
    }));

export const generateDummySendList = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      name: faker.name.findName(),
      email_address: faker.internet.email(),
    }));

export const filterSubscriptionList = (id, subscriptions) => {
  return subscriptions.filter((el) => el.indexOf(id) > -1);
};

const rootReducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        return action.payload;
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
      case LOAD_MAIL_REQUEST:
      case LOAD_BOOKMARK_REQUEST:
        draft.loadMailLoading = true;
        draft.loadMailDone = false;
        draft.loadMailError = null;
        break;
      case LOAD_MAIL_SUCCESS:
      case LOAD_BOOKMARK_SUCCESS:
        draft.loadMailLoading = false;
        draft.loadMailDone = true;
        draft.mails = draft.mails.concat(action.data);
        draft.hasMoreMails = action.data.length === 12;
        break;
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
        // draft.me.subscriptions = action.data.subscriptions;
        draft.me.subscriptions = filterSubscriptionList(
          action.data,
          action.data.subscriptions
        );
        //filter 사용해서 action.data 값 subList에서 빼주기
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
      default:
        break;
    }
  });

export default rootReducer;
