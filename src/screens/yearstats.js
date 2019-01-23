import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from '@firebase/app'
import '@firebase/auth'
import _ from 'lodash';
import ListItem from '../components/listitem';


class YearStatsScreen extends Component {
  static navigationOptions = {
    title: 'Years',
    headerBackTitleStyle: { color: 'rgba(0,122,255,1)' },
    headerTitleStyle: { flex: 1, color: 'rgba(0,122,255,1)' },
    tabBarVisible: false
  };

  state = {
    dataSource: [],
    currentUser: firebase.auth().currentUser
  }


  componentWillMount() {
    if (this.state.currentUser !== null) {
      this.createDataSource(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.currentUser !== null) {
      this.createDataSource(nextProps)
    }
  }

  createDataSource({ userData }) {
  this.setState({ dataSource: _.filter(Object.keys(userData), (key) => {
      return key !== "username" && key !== "role"
    }) })
  }

  onNavigate = () => {
    if (this.props.navigation) {
      this.props.navigation.navigate('months')
    } else {
      this.props.navigate('months')
    }
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        prop="Year"
        data={item}
        navigate={this.onNavigate}
      />
    );
  }

  render() {
    if (this.state.currentUser !== null) {
      return (
        <List>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item,index) =>  `list-${item}-${index}`}
          />
        </List>
      );
    } else {
      return (<View />)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});

const mapStateToProps = (state) => {
  const { navigate } = state.auth
  const { usersData, selectedUser } = state.data
  const userData = (usersData !== null) ? usersData[selectedUser] : state.data.userData
  return { userData, navigate }
}

export default connect(mapStateToProps, null)(YearStatsScreen)
