import React, { Component } from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeScreen from '../screens/welcome';
import SignInScreen from '../screens/signin';
import SignUpScreen from '../screens/signup';
import HomeScreen from '../screens/home';
import StatsNavigator from './statsnavigator';

export default class RootNavigator extends Component {

  componentWillMount() {
    const AuthStack = StackNavigator({
      home: { screen: HomeScreen },
      signin: { screen: SignInScreen },
      signup: { screen: SignUpScreen },
    }, {
        initialRouteName:  'signin',
      });

    const MainFlow = TabNavigator({
      home: { screen: AuthStack },
      stats: { screen: StatsNavigator,
        navigationOptions : ({ navigation }) => ({
          tabBarLabel: 'Stats',
         tabBarIcon: ({ tintColor }) => (
          <Icon
          name='ios-stats-outline'
          size={30}
          color='#01addf'
          />
    )
  })},
      welcome: { screen: WelcomeScreen },
    }, {
        initialRouteName: (this.props.showWelcome) ? 'welcome' : 'home',
        tabBarComponent: ({ navigation, ...rest }) => {
          return (<TabBarBottom
            {...rest}
            navigation={{
              ...navigation,
              state: {
                ...navigation.state,
                routes: navigation.state.routes.filter(r => r.routeName !== 'welcome')
              }
            }}
          />);
        },
        tabBarPosition: 'bottom',
        swipeEnabled: false
      })
    this.state = {
      main: MainFlow
    }
  }

  render() {
    return (<this.state.main />);
  }
}
