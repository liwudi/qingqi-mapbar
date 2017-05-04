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
DatePicker.dismissedAction = true;
DatePicker.open = function (data) {
    date = moment(data.date).format('YYYY-MM-DD') + ' 23:59:59';
    let minimumDate = data.minDate ? moment(data.minDate).format('YYYY-MM-DD') + ' 23:59:59' : '1900-01-01 00:00:00',
        maximumDate = data.minDate ? moment(data.maxDate).format('YYYY-MM-DD') + ' 23:59:59' : '2222-12-12 23:59:59';
    return new Promise(function (resolve, reject) {
        DatePicker.show({
            titleText: '选择日期',
            yearText: '年',
            monthText: '月',
            dayText: '日',
            selectedDate: date,
            minimumDate: minimumDate,
            maximumDate: maximumDate,
            datePickerMode: 'date',
            onPickerConfirm: (selectedDate) => {
                console.log(selectedDate);
                console.log('onPickerConfirm');
                let date = selectedDate.split('-'),
                    y = +date[0],
                    m = +date[1] - 1,
                    d = +date[2];
                return resolve({
                    year: y,
                    month: m,
                    day: d,
                    action: false
                });
            },
            onPickerCancel: () => {
                /*console.log('date picker canceled');
                return resolve({action: sdate});*/
            },
            onPickerDidSelect: (selectedDate) => {
                console.log('onPickerDidSelect');
                console.log(selectedDate);
            }
        });
    });

};
export default DatePicker;