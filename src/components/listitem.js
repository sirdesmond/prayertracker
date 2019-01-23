import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { setSelectedRow } from '../actions';





class ListItem extends Component {

    onRowPress = () => {
        const prop = this.props.prop
        const value = this.props.data
        this.props.setSelectedRow({prop, value})
        this.props.navigate()
    }

    render() {
        return (
            <View collapsable={false}>
                <TouchableHighlight onPress={this.onRowPress}>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            {this.props.data}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    },
    text: {
        flex: 1,
        fontSize: 20
    }
})

export default connect(null, { setSelectedRow })(ListItem)
