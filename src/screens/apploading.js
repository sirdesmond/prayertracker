import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import firebase from 'react-native-firebase'
import offline from 'react-native-simple-store';




export default class AppLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    let currentUser;
    offline.get("@TB:currentUser")
      .then(user => currentUser = user)
      .then( _ => {
        firebase.database().ref(`/users/${currentUser.uid}/`)
          .on('value', snapshot => {
            const val = snapshot.val();
            const initialRouteName = (val && val.role == 'admin') ? 'list' : 'years'
            this.props.navigation.replace(initialRouteName)
          })
      })
  }

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