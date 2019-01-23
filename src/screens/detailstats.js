import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Pie } from 'react-native-pathjs-charts'
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
      newData.push({ "name" : `${week} : ${parseFloat(monthData[week]/3600).toFixed(2)} hr(s)`,
      "time": Number.parseFloat(monthData[week])/3600})
   })

   this.setState({...this.state, data: newData})
  }

  render() {

    let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }
    return (
     <View style={styles.container}>
        <Pie data={this.state.data}
          options={options}
          accessorKey="time"
          margin={{top: 20, left: 20, right: 20, bottom: 20}}
          color="#2980B9"
          pallete={
            [
              {'r':25,'g':99,'b':201},
              {'r':24,'g':175,'b':35},
              {'r':190,'g':31,'b':69},
              {'r':100,'g':36,'b':199},
              {'r':214,'g':207,'b':32},
              {'r':198,'g':84,'b':45}
            ]
          }
          r={50}
          R={150}
          legendPosition="bottomLeft"
          label={{
            fontFamily: 'Arial',
            fontSize: 8,
            fontWeight: true,
            color: '#ECF0F1'
          }}
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
