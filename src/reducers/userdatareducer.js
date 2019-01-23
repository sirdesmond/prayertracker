import * as types from '../actions/types';

const INITIAL_STATE =
  { 
      userData: null,
      usersData: null,
      role: 'user',
      username: '',
      userNames: [],
      selectedUser: null,
      selectedYear: null,
      selectedMonth: null,
      selectedWeek: null,
  };


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_DATA_UPDATED:
      return { ...state, userData: action.payload };
    case types.USER_DATA_FETCH_SUCCESS:
      return { ...state, userData: action.payload };
    case types.ALL_USERS_DATA_FETCH_SUCCESS:
      return { ...state, userNames: action.payload.displayNames, usersData: action.payload.usersData };
    case types.ROW_SELECTED: 
      return {...state, [action.payload.key]: action.payload.value}
    default:
      return state;
  }
};
