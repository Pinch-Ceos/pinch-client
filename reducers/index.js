import { HYDRATE } from 'next-redux-wrapper';

const initalState = {
  email_address: null,
  name: null,
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

const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case GIVE_CODE_REQUEST:
      return {
        ...state,
        giveCodeLoading: true,
        giveCodeDone: false,
      };
    case GIVE_CODE_SUCCESS:
      return {
        ...state,
        giveCodeLoading: false,
        giveCodeDone: true,
        email_address: action.data.user_email_address,
        name: action.data.user_name,
        subscribe_list: action.data.subscribe_list,
        //미완성
      };
    case GIVE_CODE_FAILURE:
      return {
        ...state,
      };
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        auth_uri: action.data,
        logInLoading: false,
        logInDone: true,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    default:
      return state;
  }
};

export default rootReducer;
