import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/authloading';
import WelcomeScreen from '../screens/welcome';
import MainTabNavigator from './MainTabNavigator'

export default createAppContainer(createSwitchNavigator({
  authLoading: AuthLoadingScreen,
  welcome: WelcomeScreen,
  main: MainTabNavigator
}));