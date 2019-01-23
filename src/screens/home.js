import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, NetInfo, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { connect } from 'react-redux';
import firebase from '@firebase/app'
import '@firebase/auth'
import BackgroundTimer from 'react-native-background-timer';
import { NavigationActions } from 'react-navigation';
import { updateUserData, fetchUserData } from '../actions';

const moment = require('moment');
require('moment-recur');

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => ({
      header: null,
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
       <Icon
       name='ios-home-outline'
       size={30}
       color='#01addf'
       />
    ),
    });

  constructor(props) {
    super(props);
    this.state = {
      praying: false,
      seconds: 1,
      minutes: 0,
      hours: 0,
      time: '00:00:00',
      monthData: {},
      yearData: {},
      userData: {},
      week: `week${parseInt(moment().monthWeek())+1}`,
      month: String(months[moment().month()]) || '',
      year: String(moment().year()) || '',
      timeprayed: 0,
      initialTimeSet: false
    }
  }



   componentWillMount(){
    const { currentUser } = firebase.auth();
    if (currentUser !== null ){
      this.props.fetchUserData()
    }
  }


  componentWillReceiveProps(nextProps) {
    this.initialSetup(nextProps)
  }

  initialSetup({ userData }){
    this.state.userData = userData
    this.state.yearData = this.state.userData[this.state.year] || {}
    this.state.monthData = this.state.yearData[this.state.month] || {}

    if(this.state.initialTimeSet == false){
      this.state.timeprayed = parseInt(this.state.monthData[this.state.week]) || 0
      // console.log(`time prayed: ${this.state.timeprayed}`)
      this.state.initialTimeSet = true
    }
  }
  onButtonPress = () => {
    if (!this.state.praying) {
      this.setState({ ...this.state, praying: !this.state.praying });
      BackgroundTimer.runBackgroundTimer(() => {
        this.updateTimer();
      }, 1000);
    } else {
      BackgroundTimer.stopBackgroundTimer();
      //TODO:offline storage
      this.saveUserDataToFirebase();
      this.setState({ ...this.state, praying: !this.state.praying });
    }
  }

  updateTimer = () => {
    const { seconds, minutes, hours } = this.state;
    this.setState({ ...this.state, seconds: seconds + 1 });

    if (seconds === 59) {
      this.setState({ ...this.state, minutes: minutes + 1, seconds: 0 });
    }
    if (minutes === 60) {
      this.setState({ ...this.state, hours: hours + 1, minutes: 0 });
    }

    const secondsString = seconds > 9 ? `${seconds}` : `0${seconds}`;
    const minutesString = minutes > 9 ? `${minutes}` : `0${minutes}`;
    const hoursString = hours > 9 ? `${hours}` : `0${hours}`;


    const time = `${hoursString}:${minutesString}:${secondsString}`;

    this.setState({ ...this.state, time });
  }

  saveUserDataToFirebase = () => {
    // console.log('syncing time prayed with firebase...')
    const { seconds, minutes, hours, week, month, year } = this.state;
    let { monthData, yearData, userData } = this.state;
    const newtime = (hours * 60 * 60) + (minutes * 60) + seconds;
    //prepare the userData
    monthData[week] = this.state.timeprayed + newtime;
    yearData[month] = monthData;
    userData[year] = yearData;

    //updating state
    this.setState({ ...this.state, monthData, yearData, userData });
    this.props.updateUserData(userData);
  }


  renderButton() {
    if (!this.state.praying) {
      return (
        <Icon
          name='ios-play'
          size={200}
          color='#01addf'
          style={styles.iconStyle}
        />
      );
    }
    return (
      <Icon
        name='ios-pause'
        size={200}
        color='#01addf'
        style={styles.iconStyle}
      />
    );
  }

  renderTime() {
    return (
      <Text style={styles.timerTextStyle}>{this.state.time}</Text>
    );
  }


  render() {
    Keyboard.dismiss()
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity onPress={this.onButtonPress}>
          {this.renderButton()}
        </TouchableOpacity>

        <View>
          {this.renderTime()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { userData } = state.data;
  return { userData };
};

export default connect(mapStateToProps,{ updateUserData, fetchUserData })(HomeScreen);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timerTextStyle: {
    fontSize: 60,
    color: '#03A9F4'
  }
});
