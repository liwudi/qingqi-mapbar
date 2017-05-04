import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import Env from '../utils/Env';
const color = Env.button.color.cancel,
    estyle = Env.style;
export default class CancelButton extends Component {
    _onPress() {
        (!this.props.disabled) && this.props.onPress && this.props.onPress();
    }

    render() {
        let size = Env.button.size[this.props.size || 'middle'];
        return (
            <TouchableOpacity
                activeOpacity={.7}
                underlayColor={this.props.disabled ? color.disabled : color.press}
                onPress={this._onPress.bind(this)}
                style={[estyle.fxCenter, estyle.border, size,
                    {backgroundColor: this.props.disabled ? color.disabled : color.normal}
                    ,this.props.style
                ]}>
                <Text style={[estyle.text,
                    {color: this.props.disabled ? color.disabledFont : Env.color.text}]}>{this.props.children}</Text>

            </TouchableOpacity >
        );
    }
}
