import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import SignInScreen from '../screens/signin';
import SignUpScreen from '../screens/signup';
import HomeScreen from '../screens/home';
import BlazersScreen from '../screens/blazerslist';
import YearStatsScreen from '../screens/yearstats';
import MonthStatsScreen from '../screens/monthstats';
import DetailStatsScreen from '../screens/detailstats';
import AppLoadingScreen from '../screens/apploading';


const AuthStack = createStackNavigator({
  signin: SignInScreen,
  signup: SignUpScreen,
  home:  HomeScreen,
});

AuthStack.navigationOptions = ({ navigation })  => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if(routeName == 'home'){
    navigationOptions.tabBarLabel = 'home'
    navigationOptions.tabBarIcon =  ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? 'ios-home'
            : 'md-home'
        }
      />
    )
  }
  else{
    navigationOptions.tabBarVisible = false
  }
  return navigationOptions;
};

const AppStack =  createStackNavigator({
  appLoading: AppLoadingScreen,
  list: BlazersScreen,
  years: YearStatsScreen,
  months: MonthStatsScreen,
  details: DetailStatsScreen
})

AppStack.navigationOptions = {
  tabBarLabel: 'list',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

export default createBottomTabNavigator({
  auth: AuthStack,
  app:AppStack
})
