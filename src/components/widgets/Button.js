import React, {Component} from 'react';
import {TouchableHighlight, TouchableOpacity, StyleSheet} from 'react-native';
import Env from '../../utils/Env';
const estyle = Env.style;
export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={.7}
                onPress={this._onPress.bind(this)}
                style={[estyle.fxCenter, this.props.style]}>
                {this.props.children}
            </TouchableOpacity>
        );
    }

    _onPress() {
        (!this.props.disabled) && this.props.onPress && this.props.onPress();
    }
}
