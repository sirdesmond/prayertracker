import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Spinner } from '../components';

class SignInScreen extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Login or Create Account',
    headerTitleStyle: styles.titleStyle,
    header: null,
    tabBarVisible: false,
  })

  onSignInPress = () => {
    const { email, password } = this.props;
    const { navigate } = this.props.navigation;
    this.props.loginUser({ email, password, navigate });
  }

  onSignUpPress = () => {
    //navigate to sign up screen
    this.props.navigation.navigate('signup');
  }

  onEmailChange = (text) => {
    this.props.emailChanged(text);
  }

  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <View style={styles.buttonContainer}>
        <Button
          title='SIGN IN'
          buttonStyle={styles.buttonStyle}
          onPress={this.onSignInPress}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View>
          <Text style={styles.titleStyle}>
            Login or Create Account
          </Text>

          <Input
            placeholder='Email'
            onChangeText={this.onEmailChange}
            value={this.props.email}
          />
          <Input
            placeholder='Password'
            onChangeText={this.onPasswordChange}
            value={this.props.password}
            secureTextEntry
          />

          {this.renderButton()}
        </View>

        <View style={styles.signupContainerStyle}>
          <Text style={styles.titleStyle}>Dont have an account?</Text>
          <View style={styles.buttonContainer}>
            <Button
              title='SIGN UP'
              buttonStyle={styles.buttonStyle}
              onPress={this.onSignUpPress}
            />

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginTop: 24,
    justifyContent: 'space-between',
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#01addf'
  },
  signupContainerStyle: {
    marginTop: 'auto',
    marginBottom: 220
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonStyle: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#01addf',
    height: 45
    }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, username, loading, error } = auth;
  return { email, password, username, loading, error };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(SignInScreen);
