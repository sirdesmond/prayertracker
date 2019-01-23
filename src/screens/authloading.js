import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import firebase from 'firebase'
import offline from 'react-native-simple-store';



export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const show = await AsyncStorage.getItem('@TB:showWelcome');
    let currentUser; 

    offline.get("@TB:currentUser")
    .then(user => currentUser = user)
    .then(something => {
       if (show === null) {
      AsyncStorage.setItem('@TB:showWelcome', 'true')
      this.props.navigation.navigate('welcome');
      }
    else{
      firebase.database().ref(`/users/${currentUser.uid}/`)
      .on('value', _ => {
        if(currentUser == null ){
          this.props.navigation.navigate('signin');
        }else {
          this.props.navigation.navigate('home');
        }
      })
    }
  })
};

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});