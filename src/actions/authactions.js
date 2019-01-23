import firebase from 'firebase';
import * as types from './types';
import Toast from 'react-native-simple-toast';

export const emailChanged = (text) => ({
    type: types.EMAIL_CHANGED,
    payload: text
});

export const passwordChanged = (text) => ({
    type: types.PASSWORD_CHANGED,
    payload: text
});

export const usernameChanged = (text) => ({
    type: types.USERNAME_CHANGED,
    payload: text
});

export const loginUser = ({ email, password, navigate }) => {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => _loginUserSuccess(dispatch, navigate, user))
      .catch((err) => {
        //something is wrong here..
        // console.log(`error here...${err}`);
        _loginUserFail(dispatch);
    });
  };
};

const _loginUserSuccess = async (dispatch, navigate, user) => {
  await dispatch({
    type: types.LOGIN_USER_SUCCESS,
    payload: {user,navigate}
  });
  navigate('home');
};

const _loginUserFail = (dispatch) => {
  dispatch({ type: types.LOGIN_USER_FAIL });
};

export const signupUser = ({ email, password, username, navigate }) => {
  return (dispatch) => {
    dispatch({ type: types.SIGNUP_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( ({user}) => {
        console.log("user: ", user)
        user.updateProfile({ displayName: username })
        _signupUserSuccess(dispatch, user, navigate)
      })
      .catch(() => _signupUserFail(dispatch));
  };
};

const _signupUserSuccess = (dispatch, user, navigate) => {
    dispatch({ type: types.SIGNUP_USER_SUCCESS, payload: user });
    Toast.show('Registration completed successfully!', Toast.SHORT);
    navigate('signin');
};

const _signupUserFail = (dispatch) => {
  dispatch({ type: types.SIGNUP_USER_FAIL });
  Toast.show('Error...try again', Toast.SHORT);
};
