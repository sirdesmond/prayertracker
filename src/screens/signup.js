import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
      <Button
        title='Sign Up'
        backgroundColor='rgba(0,0,0,0)'
        color='rgba(122,122,122,1)'
        large
        onPress={this.onSignUpPress}
      />
    );
  }

  render() {
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>
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

const mapStateToProps = ({ auth }) => {
  const { email, password, username, loading, error, user } = auth;
  return { email, password, username, loading, error, user };
};

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, usernameChanged, signupUser })(SignUpScreen);
