import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'react-native-firebase'
import offline from 'react-native-simple-store'
import AppNavigator from './src/navigation/AppNavigator';
import configureStore from './src/store/configureStore';
import config from './src/config'
import './src/utilities/yellowBoxFix'

let currentUser = null

export default class App extends React.Component {

  async componentWillMount() {
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
