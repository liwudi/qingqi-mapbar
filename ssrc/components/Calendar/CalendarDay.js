/**
 * Created by bogdanbegovic on 8/20/16.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    View
} from 'react-native';
import styles from './Calendar.style.js';

import Env from '../../utils/Env';

export default class CalendarDay extends Component {

    static defaultProps = {
        borderHighlightColor: '#000',
        event:false
    };

    constructor(props) {
        super(props);
    }

    //When component mounts, if it is seleced run animation for animation show
    componentDidMount() {
        if (this.props.selected) {
        }
    }

    //When component receives the props, if it is selected use showing animation
    //If it is deselected, use hiding animation
    componentWillReceiveProps(nextProps) {
    }


    render() {

        let dateNameStyle =
            [
                styles.dateName,
                this.props.selected && styles.textSelect,
                !this.props.isCurrentMonthDate && styles.weekendDateName
            ];
        let dateNumberStyle =
            [
                styles.dateNumber,
                this.props.selected && styles.textSelect,
                !this.props.isCurrentMonthDate && styles.weekendDateNumber
            ];
        let datePointStyle = [this.props.event ? styles.pointSelect : styles.point];

        return (
            <View style={[styles.dateContainer, {backgroundColor: this.props.selected ? this.props.highlightColor : null }]}>
                <TouchableOpacity style={[Env.style.fxCenter]} onPress={this.props.onDateSelected.bind(this, this.props.date)}>
                    <Text style={dateNameStyle}>{this.props.date.format('ddd').toUpperCase()}</Text>
                    <Text style={dateNumberStyle}>{this.props.date.date()}</Text>
                    <View style={datePointStyle}></View>
                </TouchableOpacity>
            </View>
        );
    }
}
