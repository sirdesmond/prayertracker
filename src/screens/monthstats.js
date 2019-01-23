import React, { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { List, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import ListItem from '../components/listitem';

class MonthStatsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Months',
    headerBackTitleStyle: { color: 'rgba(0,122,255,1)' },
    headerTitleStyle: { flex: 1, color: 'rgba(0,122,255,1)' },
    tabBarVisible: false
  });

  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    }
  }

  componentWillMount() {
    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource({ yearData }) {
    this.setState({ dataSource: Object.keys(yearData)})
  }

   onNavigate = () => {
    if (this.props.navigation){
      this.props.navigation.navigate('details')
    } else {
    this.props.navigate('details')
    }
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        prop="Month"
        data={item}
        navigate={this.onNavigate}
      />
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item,index) =>  `list-${item}-${index}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  }
});


const mapStateToProps = (state) => {
  const { navigate } = state.auth
  const { usersData, selectedUser, selectedYear } = state.data
  const yearData = (usersData !== null ) ? usersData[selectedUser][selectedYear] : state.data.userData[selectedYear]
  return { yearData, navigate }
}

export default connect(mapStateToProps, null)(MonthStatsScreen)
