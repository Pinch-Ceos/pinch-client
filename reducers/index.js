import { HYDRATE } from 'next-redux-wrapper';
import produce from 'immer';
import faker from 'faker';
import shortId from 'shortid';

const initalState = {
  email_address: null,
  name: null,
  mails: [],
  subscribe_list: [],
  bookmark: [],
  auth_uri: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  giveCodeLoading: false,
  giveCodeDone: false,
  giveCodeError: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const GIVE_CODE_REQUEST = 'GIVE_CODE_REQUEST';
export const GIVE_CODE_SUCCESS = 'GIVE_CODE_SUCCESS';
export const GIVE_CODE_FAILURE = 'GIVE_CODE_FAILURE';

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

const rootReducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case HYDRATE:
        Object.assign(draft, action.payload);
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
