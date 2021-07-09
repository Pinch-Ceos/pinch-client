import { HYDRATE } from 'next-redux-wrapper';
const initalState = {
  name: null,
  email: null,
  subscribe: [],
  bookmark: [],
  lateLoginDate: null,
};
const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case 'LOG_IN':
      return {
        ...state,
        name: action.data.name,
        email: action.data.email,
        subscribe: action.data.subscribe,
        bookmark: action.data.bookmark,
        lateLoginDate: action.data.lateLoginDate,
      };
    default:
      return state;
  }
};

export default rootReducer;
