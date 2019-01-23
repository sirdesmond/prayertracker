import React, { Component } from 'react';
import { Slides } from '../components/';

const SLIDE_DATA = [
  { text: 'Blazers pray without ceasing', color: '#03A9F4' },
  { text: 'Praying with your spirit is the key to hightened spiritual sensitivity.',
   color: '#01addf' },
  { text: 'TrailBlazer....You ready to start praying?', color: '#03A9F4' }
];

export default class WelcomeScreen extends Component {
  static navigationOptions = () => ({
    tabBarVisible: false,
  })

  onComplete = () => {
    this.props.navigation.navigate('signin');
  }

  render() {
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onComplete} />
    );
  }
}
