import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase'
import offline from 'react-native-simple-store'
import AppNavigator from './src/navigation/AppNavigator';
import configureStore from './src/store/configureStore';
import config from './src/config'
import './src/utilities/yellowBoxFix'
//show welcome screen only on users first time.
//show login if it's users first time.
//store valid logged in token on user device

//if user has logged in before whiles online
//store userData to local storage when user is offline
//if storing to firebase and user goes offline, fallover to local storage.
//when user is back online, sync firebase with local storage.

let currentUser = null

export default class App extends React.Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: config.API_KEY,
      authDomain: config.AUTH_DOMAIN,
      databaseURL: config.DATABASE_URL,
      projectId: config.PROJECT_ID,
      storageBucket: config.STORAGE_BUCKET,
      messagingSenderId: config.MESSAGING_SENDER_ID

    })
    currentUser = firebase.auth()

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        offline.save("@TB:currentUser", user)
      }
    })
  }


  render() {
    const store = configureStore()

    offline.get('@TB:currentUser')
    .then(user => currentUser = user)

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <Provider store={store}>
          <AppNavigator currentUser={currentUser}/>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  }
});
