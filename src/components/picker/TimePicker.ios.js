/**
 * Created by cryst on 2016/10/17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import { DatePicker, DataPicker } from 'rnkit-actionsheet-picker';
import moment from 'moment';
const baseClass = DatePicker.constructor;
let TimePicker = new baseClass();
TimePicker.dismissedAction = true;
TimePicker.open = function (data) {
    console.info('timepicker')
    console.info(data)
    let hour = data.hour || 0,
        minute = data.minute || 0;
    if(hour < 10) hour = '0' + hour;
    if(minute < 10) minute = '0' + minute;
    let date = moment().format('YYYY-MM-DD') + ' ' + hour + ':' + minute + ':' + '00';
    console.info(date)
    return new Promise(function (resolve, reject) {
        DatePicker.show({
            titleText: '选择时间',
            selectedDate: date,
            hoursText: '时',
            minutesText: '分',
            datePickerMode: 'time',
            onPickerConfirm: (dt, tm) => {
                console.log(dt);
                console.log(tm);
                console.log('onPickerConfirm');
                let date = dt.split(':'),
                    y = +date[0],
                    m = +date[1],
                    d = +date[2];
                return resolve({
                    hour: y,
                    minute: m,
                    action: false
                });
            },
            onPickerCancel: () => {
                /*console.log('date picker canceled');
                 return resolve({action: sdate});*/
            },
            onPickerDidSelect: (selectedDate) => {
                console.log('onPickerDidSelect');

            }
        });
    });

};
export default TimePicker;