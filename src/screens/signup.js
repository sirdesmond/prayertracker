import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, usernameChanged, signupUser } from '../actions';
import { Spinner } from '../components';


class SignUpScreen extends Component {
  static navigationOptions = () => ({
    tabBarVisible: false,
  })

  onSignUpPress = () => {
    const { email, password, username } = this.props;
    const { navigate } = this.props.navigation;
    this.props.signupUser({ email, password, username, navigate });
  }

  onEmailChange = (text) => {
    this.props.emailChanged(text);
  }

  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  }

  onUsernameChange = (text) => {
    this.props.usernameChanged(text);
  }


  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <View style={styles.buttonContainer}>
        <Button
          title='Sign Up'
          buttonStyle={styles.buttonStyle}
          large
          onPress={this.onSignUpPress}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          Create Account
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

        <Input
          placeholder='Username'
          onChangeText={this.onUsernameChange}
          value={this.props.username}
        />

        {this.renderButton()}
      </View>

    );
  }
}

const styles = StyleSheet.create({
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
  const { email, password, username, loading, error, user } = auth;
  return { email, password, username, loading, error, user };
};

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, usernameChanged, signupUser })(SignUpScreen);
