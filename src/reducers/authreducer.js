import * as types from '../actions/types';

const INITIAL_STATE =
{
  email: '',
  password: '',
  username: '',
  group: '',
  user: null,
  error: '',
  loading: false,
  navigate: null
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case types.GROUP_CHANGED:
      return { ...state, group: action.payload };
    case types.PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case types.USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case types.LOGIN_USER:
    case types.SIGNUP_USER:
      return { ...state, loading: true, error: '' };
    case types.LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload.user, navigate: action.payload.navigate };
    case types.SIGNUP_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload.user };
    case types.LOGIN_USER_FAIL:
    case types.SIGNUP_USER_FAIL:
      return { ...state, ...INITIAL_STATE, error: 'Authentication Failed.' };

    default:
      return state;
  }
};
