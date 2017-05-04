/**
 * Created by cryst on 2016/10/11.
 */
/**
 * Created by cryst on 2016/10/11.
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
                    numberOfLines={3}
                    underlineColorAndroid="transparent"
                    style={[estyle.text, {padding: 0}]}
                />

    }
}