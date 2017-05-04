/**
 * Created by cryst on 2016/10/22.
 */
import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet, ListView, ScrollView,TouchableNativeFeedback} from 'react-native';
import Env from '../../../../utils/Env';
const estyle = Env.style;
import {IconArrowDown} from '../../../../components/Icons'

import Button from '../../../../components/widgets/Button'
export default class ServiceBtn extends Component {
    render () {
        let color = this.props.active ? Env.color.main : Env.color.text;
        return <Button style={[estyle.fx1,estyle.fxRow, estyle.cardBackgroundColor,estyle.fxRowCenter,{...this.props.style}]} onPress={this.props.onPress}>
            <Text numberOfLines={1} style={[estyle.note, {color: color}]}>{this.props.title}</Text>
            <IconArrowDown size={12} color={color} style={styles.location} />
        </Button>
    }
}
const basefont = Env.font.base;
const styles = StyleSheet.create({
    location: {
        marginTop: basefont * 3,

    }
});