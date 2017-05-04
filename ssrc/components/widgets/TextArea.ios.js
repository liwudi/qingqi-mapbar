/**
 * Created by mapbar on 2017/1/11.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, TextInput} from 'react-native';

import Env from '../../utils/Env';
const estyle = Env.style;
export default class TextArea extends Component {
    render() {
        return <TextInput
            {...this.props}
            multiline={true}
            placeholderTextColor={Env.color.note}
            style={[estyle.text, {padding: 0}]}
        />

    }
}