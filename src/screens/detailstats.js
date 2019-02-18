import React, { Component } from 'react';
import { ListView, StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { VictoryPie, VictoryLabel } from "victory-native";
import ListItem from '../components/listitem';

class DetailStatsScreen extends Component {
  state = {
    data : []
  }
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: 'Details',
    headerBackTitleStyle: { color: 'rgba(0,122,255,1)' },
    headerTitleStyle: { flex: 1, color: 'rgba(0,122,255,1)' },
  });


  componentWillMount() {
    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource({ monthData }) {
    let newData = []
   _.each(Object.keys(monthData),(week) => {
      newData.push({ "name" : `${week.replace(" ","").substring(4,6)} : ${parseFloat(monthData[week]/3600).toFixed(2)}`,
      "time": Number.parseFloat(monthData[week])/3600})
   })

   this.setState({...this.state, data: newData})
  }

  render() {

    return (
     <View style={styles.container}>
        <Text style={{paddingBottom: 10, fontSize: 30 }}>
          WEEKS( hrs )
        </Text>

        <VictoryPie 
          data={this.state.data}
          labels={(d) => d.name}
          colorScale="cool"
          // labelComponent={<VictoryLabel angle={45}/>}
          style={{ labels: { fill: "black", fontSize: 20, fontWeight : "bold", pad: 5 }}}
          x="name"
          y="time"
          />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { usersData, selectedUser, selectedYear, selectedMonth } = state.data
  const monthData = (usersData !== null ) ?
                    usersData[selectedUser][selectedYear][selectedMonth] :
                    state.data.userData[selectedYear][selectedMonth]
  return { monthData }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

export default connect(mapStateToProps, null)(DetailStatsScreen)
