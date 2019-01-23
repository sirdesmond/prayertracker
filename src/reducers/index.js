import { combineReducers } from 'redux';
import AuthReducer from './authreducer';
import UserDataReducer from './userdatareducer';

export default combineReducers({
  auth: AuthReducer,
  data: UserDataReducer
});
