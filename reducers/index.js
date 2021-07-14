import { HYDRATE } from 'next-redux-wrapper';
import produce from 'immer';
import faker from 'faker';
import shortId from 'shortid';

const initalState = {
  email_address: null,
  name: null,
  mails: [],
  sender_list:[],
  subscribe_list: [],
  bookmark: [],
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



export const generateDummyCard = (number) => {
  Array(number)
    .fill()
    .map(() => {
      name: faker.name.findName();
      email_address: faker.internet.email();
      datetime: faker.datatype.datetime();
      subject: faker.name.title();
      snippet: faker.lorem.paragraph();
      image: faker.image.image();
      html: '<div>asd</div>';
    });
};

// export const generateDummySubList = (number) => {
//   Array(number)
//     .fill()
//     .map(() => {
//       name: faker.name.userName();
//       email_address: faker.internet.email();
//     });
// };

export const generateDummySendList = [
  {
    "name": "Google",
    "email_address": "no-reply@accounts.google.com"
  },
  {
    "name": "Apple Music",
    "email_address": "new@applemusic.com"
  },
  {
    "name": "Instagram",
    "email_address": "no-reply@mail.instagram.com"
  },
  {
    "name": "NEWNEEK",
    "email_address": "whatsup@newneek.co"
  },
  {
    "name": "임해진",
    "email_address": "hj0816hj@naver.com"
  },
  {
    "name": "YouTube",
    "email_address": "noreply@youtube.com"
  },
  {
    "name": "LinkedIn",
    "email_address": "messages-noreply@linkedin.com"
  },
  {
    "name": "GitGuardian",
    "email_address": "security@mail.gitguardian.com"
  },
  {
    "name": "GitHub",
    "email_address": "noreply@github.com"
  },
  {
    "name": "Apple",
    "email_address": "no_reply@email.apple.com"
  }
];

const rootReducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        Object.assign(draft, action.payload);
        break;
      case SENDER_LIST_REQUEST:
        draft.senderListLoading = true;
        draft.senderListDone = false;
        draft.senderListError = null;
        break;
      case SENDER_LIST_SUCCESS:
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
        draft.subscribe_list = action.data.subscribe_list;
        //토큰 처리
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
