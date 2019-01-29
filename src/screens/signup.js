import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Form, Picker, Icon } from 'native-base';
import { emailChanged, passwordChanged, usernameChanged, groupChanged, signupUser } from '../actions';
import { Spinner } from '../components';


class SignUpScreen extends Component {
  static navigationOptions = () => ({
    tabBarVisible: false,
  })

  state = {
    groupSelected: undefined
  }

  onSignUpPress = () => {
    const { email, password, username, group } = this.props;
    const { navigate } = this.props.navigation;
    this.props.signupUser({ email, password, username, group, navigate });
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

  onGroupChange = (text) => {
    this.setState({ groupSelected: text })
    this.props.groupChanged(text);
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

        <View style={styles.groupsContainer}>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select your Group"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.groupSelected}
              onValueChange={this.onGroupChange}
            >
              <Picker.Item 
                label="Select your Group"
                value="null"
                style={styles.groupPlaceHolder}
              >
              </Picker.Item> 
              <Picker.Item label="Judah" value="Judah" />
              <Picker.Item label="Dan" value="Dan" />
              <Picker.Item label="Ephraim" value="Ephraim" />
              <Picker.Item label="Levi" value="Levi" />
            </Picker>
          </Form>

        </View>

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
  },
  groupsContainer: {
    paddingTop: 10,
  },
  groupPlaceHolder: {
    opacity: .1,
    color: '#bfc6ea',
    backgroundColor: '#bfc6ea'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, username, group, loading, error, user } = auth;
  return { email, password, username, group, loading, error, user };
};

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, usernameChanged, groupChanged, signupUser })(SignUpScreen);
