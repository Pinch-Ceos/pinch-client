import { HYDRATE } from 'next-redux-wrapper';
import { useCookies } from 'react-cookie';

const initalState = {
  email_address: null,
  name: null,
  subscribe: [],
  bookmark: [],
  logInLoading: false,
  logInDone: false,
  logInError: null,
  giveCodeLoading: false,
  giveCodeDone: false,
  giveCodeError: null,
  auth_rui: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const GIVE_CODE_REQUEST = 'GIVE_CODE_REQUEST';
export const GIVE_CODE_SUCCESS = 'GIVE_CODE_SUCCESS';
export const GIVE_CODE_FAILURE = 'GIVE_CODE_FAILURE';

const rootReducer = (state = initalState, action) => {
  // const [cookies, setCookie, removeCookie] = useCookies(['Token']);
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
      // setCookie('Token', action.data.token, { path: '/' });
      return {
        ...state,
        auth_rui: action.data,
        // logInLoading: false,
        // logInDone: true,
        // name: action.data.name,
        // email_address: action.data.email,
        // subscribe: action.data.subscribe,
        // bookmark: action.data.bookmark,
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
