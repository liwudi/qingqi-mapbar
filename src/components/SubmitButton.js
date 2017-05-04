import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import ModalBox from './widgets/Modal';

import Env from '../utils/Env';
const color = Env.button.color.confirm,
    estyle = Env.style;
export default class SubmitButton extends Component {

    static defaultProps = {
        doing: false,
        disabled:false
    }

    _onPress() {
        (!this.props.disabled) && this.props.onPress && this.props.onPress();
    }

    render() {
        let size = Env.button.size[this.props.size || 'large'];
        return (
            <TouchableOpacity
                activeOpacity={.7}
                underlayColor={this.props.disabled ? color.disabled : color.press}
                onPress={() => {
                    !this.props.disabled && !this.props.doing && this._onPress();
                }}
                style={[estyle.fxCenter, estyle.border, size,
                    {backgroundColor: this.props.disabled ? color.disabled : color.normal},
                    this.props.style
                ]}>

                {this.props.doing
                    ? <ActivityIndicator
                    color="#FFF"
                />
                    : <Text style={[estyle.text,
                    {color: this.props.disabled ? color.disabledFont : Env.color.navTitle}]}>{this.props.children}</Text>
                }
                {/*<ModalBox visible={this.props.doing} style={[{backgroundColor:'transparent'}]}/>*/}
            </TouchableOpacity>
        );
    }
}