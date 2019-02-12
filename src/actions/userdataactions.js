import firebase from 'react-native-firebase';
import * as types from './types';
import _ from 'lodash';

export const updateUserData = (userData) => {
    const { currentUser } = firebase.auth();
    userData = { ...userData, role: (userData.role === null || userData.role === undefined) ? 'user' : userData.role, username: currentUser.displayName }

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/`)
            .set(userData)
            .then(() => dispatch({ type: types.USER_DATA_UPDATED, payload: userData }));
    }
}

export const fetchUserData = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/`)
            .on('value', snapshot => {
                dispatch({ type: types.USER_DATA_FETCH_SUCCESS, payload: snapshot.val() });
            })
    }
}

export const fetchAllUserData = () => {
    let displayNames = [];
    let usersData = {};
    const { currentUser } = firebase.auth();

    return (dispatch) => {

        firebase.database().ref(`/users/${currentUser.uid}/`)
            .on('value', snapshot => {
                currentUserSnapshot = snapshot.val()
                firebase.database().ref(`/users/`)
                    .on('value', snapshot => {
                        _.each(snapshot.val(), (user) => {
                            if (currentUserSnapshot.username == "pastor") {
                                displayNames.push(user.username)
                                usersData[user.username] = user
                            }
                            else {
                                if (user.group == currentUserSnapshot.group) {
                                    displayNames.push(user.username)
                                    usersData[user.username] = user
                                }
                            }

                        })
                        dispatch({ type: types.ALL_USERS_DATA_FETCH_SUCCESS, payload: { displayNames, usersData } });
                    })

            })
    }
}

export const setSelectedRow = ({ prop, value }) => {
    return (dispatch) => {
        const key = "selected" + prop
        dispatch({ type: types.ROW_SELECTED, payload: { key, value } })
    }
}
