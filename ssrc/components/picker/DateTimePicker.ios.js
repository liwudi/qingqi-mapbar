import React, {Component} from 'react';
import {TouchableHighlight, TouchableOpacity, StyleSheet, DatePickerIOS, View, Text} from 'react-native';
import Env from '../../utils/Env';
import Model from '../widgets/Modal';
import Button from '../widgets/Button';
const estyle = Env.style;
export default class DateTimePicker extends Component {
    constructor() {
        super();
        this.state = {
            date : new Date()
        }
    }
    onDateChange(date) {
        this.setState({date: date});
    }
    onConfirm() {
        this.props.onConfirm(this.state.date);
        this.onCancel();

    }
    onCancel() {
        this.props.onCancel();
    }
    render() {
        return (
            <Model visible={this.props.visible} onClose={this.props.onCancel}>
                <TouchableOpacity style={[estyle.fx1]} onPress={() => {this.onCancel()}}/>
                <View style={estyle.cardBackgroundColor}>
                    <View style={[estyle.fxRow, estyle.borderBottom]}>
                        <Button
                            style={[estyle.fx1, estyle.paddingVertical, estyle.borderRight]}
                            onPress={() => {
                            this.onConfirm();
                        }}><Text style={[estyle.articleTitle, {color: Env.color.main}]}>确定</Text></Button>
                        <Button
                            style={[estyle.fx1, estyle.paddingVertical]}
                            onPress={() => {
                            this.props.onCancel();
                        }}><Text style={[estyle.articleTitle]}>取消</Text></Button>
                    </View>
                    <DatePickerIOS
                        minimumDate={new Date()}
                        date={this.state.date}
                        mode="datetime"
                        timeZoneOffsetInMinutes={8 * 60}
                        onDateChange={(date) => {
                            this.onDateChange(date);
                        }}
                    />
                </View>

            </Model>
        );
    }

    _onPress() {
        (!this.props.disabled) && this.props.onPress && this.props.onPress();
    }
}
