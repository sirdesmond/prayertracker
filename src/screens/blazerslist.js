import React, { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchAllUserData } from '../actions';
import ListItem from '../components/listitem';


class BlazersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    }
  }

  componentWillMount() {
    this.props.fetchAllUserData();
    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource({ userNames }) {
    this.setState({ dataSource: userNames})
  }

  onNavigate = () => {
    this.props.navigation.navigate('years')
  }

  renderItem = ({item}) => {
    return (
      <ListItem
        navigate={this.onNavigate}
        prop="User"
        data={item}
      />
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={ (item,index) =>  `list-${item}-${index}`}
        />
      </View>
    );
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
  const { userNames } = state.data
  return { userNames, navigate }
}

export default connect(mapStateToProps, { fetchAllUserData })(BlazersScreen)
