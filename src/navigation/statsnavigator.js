import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import BlazersScreen from '../screens/blazerslist';
import YearStatsScreen from '../screens/yearstats';
import MonthStatsScreen from '../screens/monthstats';
import DetailStatsScreen from '../screens/detailstats';


class StatsNavigator extends Component {

  render(){
    const StatsNavigator =  createStackNavigator({
      list: { screen: BlazersScreen },
      years: { screen: YearStatsScreen },
      months: { screen: MonthStatsScreen },
      details: { screen: DetailStatsScreen }
    }, {
        initialRouteName: (this.props.userData && this.props.userData.role =='admin') ? 'list' : 'years',
      })
    return (   
      <StatsNavigator />
    )
  }
}

const mapStateToProps = (state) => {
  const { userData } = state.data
  const role = (userData ) ? userData.role : 'user'
  return { userData, role }
}

export default connect(mapStateToProps,null)(StatsNavigator)