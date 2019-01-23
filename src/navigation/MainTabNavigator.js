import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import WelcomeScreen from '../screens/welcome';
import SignInScreen from '../screens/signin';
import SignUpScreen from '../screens/signup';
import HomeScreen from '../screens/home';
import BlazersScreen from '../screens/blazerslist';
import YearStatsScreen from '../screens/yearstats';
import MonthStatsScreen from '../screens/monthstats';
import DetailStatsScreen from '../screens/detailstats';


const AuthStack = createStackNavigator({
  home:  HomeScreen,
  signIn: SignInScreen,
  signUp: SignUpScreen
},{
    initialRouteName:  'signIn',
  });

AuthStack.navigationOptions = {
  tabBarLabel: 'home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};



const StatsStack =  createStackNavigator({
  list: BlazersScreen,
  years: YearStatsScreen,
  months: MonthStatsScreen,
  details: DetailStatsScreen
})

StatsStack.navigationOptions = {
  tabBarLabel: 'list',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const WelcomeStack = createStackNavigator({
  welcome: WelcomeScreen,
})

WelcomeStack.navigationOptions = {
  tabBarLabel: 'welcome',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};


export default createBottomTabNavigator({
  AuthStack,
  StatsStack,
  WelcomeStack
})
