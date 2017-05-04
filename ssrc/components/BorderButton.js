import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import Env from '../utils/Env';
const estyle = Env.style;

import Button from './widgets/Button';
export default class BorderButton extends Component {
    _onPress() {
        !this.props.disabled && this.props.onPress();
    }
    render() {
        return (
            <Button onPress={this.props.onPress}
                    style={[styles.size,styles.border, {borderColor: this.props.color || Env.color.main}, this.props.style]}>
                <Text style={[estyle.note, {color:this.props.color || Env.color.main}]}>{this.props.children}</Text></Button>
        );
    }
}
const basefont = Env.font.base;
const styles = StyleSheet.create({
    size: {
        height: basefont * 44,
        paddingHorizontal: basefont *5
    },
    border: {
        borderWidth: basefont * 2,
        borderRadius: basefont * 5
    }
});
