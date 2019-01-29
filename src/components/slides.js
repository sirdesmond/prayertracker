import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <TouchableOpacity
          onPress={this.props.onComplete}
          style={styles.button}
        >
          <Text style={styles.yesText}>YES</Text>
        </TouchableOpacity>

      );
    } else {
      return (
        <Text style={{ fontSize: 14, marginTop: 20 }}> {`<<SLIDE LEFT<<`} </Text>
      )
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
        >
          <Text style={styles.slideTextStyle}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideTextStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  button: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 5,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "#03A9F4",
  },
  yesText: {
    fontSize: 16,
    color: "#03A9F4",
},
});

export { Slides };
