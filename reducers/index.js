import { HYDRATE } from 'next-redux-wrapper';
import produce from 'immer';
import faker from 'faker';

const initalState = {
  email_address: null,
  name: null,
  token: null,
  mails: [],
  sender_list: [],
  subscribe_list: [],
  bookmark: [],
  hasMoreMails: true,
  auth_uri: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  giveCodeLoading: false,
  giveCodeDone: false,
  giveCodeError: null,
  senderListLoading: false,
  senderListDone: false,
  senderListError: null,
  subscribtionListLoading: false,
  subscribtionListDone: false,
  subscribtionListError: null,
  loadMailLoading: false,
  loadMailDone: false,
  loadMailError: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const GIVE_CODE_REQUEST = 'GIVE_CODE_REQUEST';
export const GIVE_CODE_SUCCESS = 'GIVE_CODE_SUCCESS';
export const GIVE_CODE_FAILURE = 'GIVE_CODE_FAILURE';

export const SENDER_LIST_REQUEST = 'SENDER_LIST_REQUEST';
export const SENDER_LIST_SUCCESS = 'SENDER_LIST_SUCCESS';
export const SENDER_LIST_FAILURE = 'SENDER_LIST_FAILURE';

export const SUBSCRIBTION_LIST_REQUEST = 'SUBSCRIBTION_LIST_REQUEST';
export const SUBSCRIBTION_LIST_SUCCESS = 'SUBSCRIBTION_LIST_SUCCESS';
export const SUBSCRIBTION_LIST_FAILURE = 'SUBSCRIBTION_LIST_FAILURE';

export const LOAD_MAIL_REQUEST = 'LOAD_MAIL_REQUEST';
export const LOAD_MAIL_SUCCESS = 'LOAD_MAIL_SUCCESS';
export const LOAD_MAIL_FAILURE = 'LOAD_MAIL_FAILURE';

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
      html: '<div>asd</div>',
    }));

export const generateDummySendList = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      name: faker.name.findName(),
      email_address: faker.internet.email(),
    }));

const rootReducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        Object.assign(draft, action.payload);
        break;
      case LOAD_MAIL_REQUEST:
        draft.loadMailLoading = true;
        draft.loadMailDone = false;
        draft.loadMailError = null;
        break;
      case LOAD_MAIL_SUCCESS:
        draft.loadMailLoading = false;
        draft.loadMailDone = true;
        draft.mails = draft.mails.concat(action.data);
        draft.hasMoreMails = action.data.length === 12;
        break;
      case LOAD_MAIL_FAILURE:
        draft.loadMailLoading = false;
        draft.loadMailError = action.error;
        break;
      case SUBSCRIBTION_LIST_REQUEST:
        draft.subscribtionListLoading = true;
        draft.subscribtionListDone = false;
        draft.subscribtionListError = null;
        break;
      case SUBSCRIBTION_LIST_SUCCESS:
        console.log(action.data);
        draft.subscribtionListLoading = false;
        draft.subscribtionListDone = true;
        draft.subscribe_list = action.data;
        break;
      case SUBSCRIBTION_LIST_FAILURE:
        draft.subscribtionListLoading = false;
        draft.subscribtionListError = action.error;
        break;
      case SENDER_LIST_REQUEST:
        draft.senderListLoading = true;
        draft.senderListDone = false;
        draft.senderListError = null;
        break;
      case SENDER_LIST_SUCCESS:
        console.log(generateDummySendList(12));
        draft.senderListLoading = false;
        draft.senderListDone = true;
        draft.sender_list = action.data;
        break;
      case SENDER_LIST_FAILURE:
        draft.senderListLoading = false;
        draft.senderListError = action.error;
        break;
      case GIVE_CODE_REQUEST:
        draft.giveCodeLoading = true;
        draft.giveCodeDone = false;
        draft.giveCodeError = null;
        break;
      case GIVE_CODE_SUCCESS:
        draft.giveCodeLoading = false;
        draft.giveCodeDone = true;
        draft.email_address = action.data.user_email_address;
        draft.name = action.data.user_name;
        draft.subscribe_list = action.data.subscriptions;
        draft.token = action.data.token;
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
