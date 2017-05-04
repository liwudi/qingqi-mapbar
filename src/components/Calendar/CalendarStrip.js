/**
 * Created by bogdanbegovic on 8/20/16.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Animated,
    Easing,
    TouchableOpacity
} from 'react-native';
import CalendarDay from './CalendarDay';
import moment from 'moment';
import styles from './Calendar.style.js';

import Env from '../../utils/Env';

import Swiper from 'react-native-swiper';

moment.defineLocale('zh-cn', {
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort : '日_一_二_三_四_五_六'.split('_'),
    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
    longDateFormat : {
        LT : 'Ah点mm分',
        LTS : 'Ah点m分s秒',
        L : 'YYYY-MM-DD',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日Ah点mm分',
        LLLL : 'YYYY年MMMD日ddddAh点mm分',
        l : 'YYYY-MM-DD',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日Ah点mm分',
        llll : 'YYYY年MMMD日ddddAh点mm分'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar : {
        sameDay : function () {
            return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
        },
        nextDay : function () {
            return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
        },
        lastDay : function () {
            return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
        },
        nextWeek : function () {
            var startOfWeek, prefix;
            startOfWeek = moment().startOf('week');
            prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
            return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
        },
        lastWeek : function () {
            var startOfWeek, prefix;
            startOfWeek = moment().startOf('week');
            prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
            return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
        },
        sameElse : 'LL'
    },
    ordinalParse: /\d{1,2}(日|月|周)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime : {
        future : '%s内',
        past : '%s前',
        s : '几秒',
        m : '1 分钟',
        mm : '%d 分钟',
        h : '1 小时',
        hh : '%d 小时',
        d : '1 天',
        dd : '%d 天',
        M : '1 个月',
        MM : '%d 个月',
        y : '1 年',
        yy : '%d 年'
    },
    week : {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

import * as Icons from '../Icons';

//Just a shallow array of 7 elements
const arr = [];
for (let i = 0; i < 7; i++) {
    arr.push(i);
}

let current = moment();

function today() {
    current = moment();
    return getMonthInfo(0);
}

function getMonthInfo(next) {

    let self = {};

    if(next) current = current.add(next,'M');

    self.current = current.clone();
    self.month = self.current.format('YYYYMM');
    self.monthStart = current.clone().startOf('month');
    self.monthEnd = current.clone().endOf('month');
    self.monthDays = current.daysInMonth();
    self.weeks = [];

    let week = null;
    for(var i = 0; i < self.monthDays; i++){
        let day = self.monthStart.clone().add(i, 'd');

        week = week || new Array(7);

        week[getDay(day.day()) - 1] = day;

        if(getDay(day.day()) === 7 || i === self.monthDays - 1){
            self.weeks.push(week);
            week = null;
        }
    }
    function getDay(day) {
        if(day === 0)return 7;
        else return day;
    }
    return self;
}

/*
 * Class CalendarStrip that is representing the whole calendar strip and contains CalendarDay elements
 *
 */
export default class CalendarStrip extends Component {

    static propTypes = {

    };

    static defaultProps = {
        startingDate: moment(),
        calendarHeaderFormat: 'YYYY MMMM',
        locale: {name:'zh-cn', config:{}},
        selection: 'background',
        calendarColor: '#FFF',
        highlightColor: Env.color.main,
        events:[]
    };

    constructor(props) {
        super(props);

        this.state = getMonthInfo();
        this.state.selectedDate = moment();

        this.componentDidMount = this.componentDidMount.bind(this);
        // this.componentWillUpdate = this.componentWillUpdate.bind(this);
        this.getPreviousMonth = this.getPreviousMonth.bind(this);
        this.getNextMonth = this.getNextMonth.bind(this);
        this.onDateSelected = this.onDateSelected.bind(this);
        this.isDateSelected = this.isDateSelected.bind(this);
    }

    //Animate showing of CalendarDay elements
    componentDidMount() {
    }

    today(){
        // this.props.todayPress();
        let m = today();
        this.setState({
            ...m
        },() => {
            let weekIndex = 0;
            this.state.weeks.forEach((week, wIndex) => {
                week.forEach((date) => {
                    if(moment().isSame(date, 'day')){
                        weekIndex = wIndex;

                    }
                });
            });
            this.refs.swiper.scrollBy(weekIndex - this.refs.swiper.state.index)
            this.onDateSelected(moment());
        });
        this.props.onMonthChange && this.props.onMonthChange(m.month);
    }

    //Set startingDate to the previous week
    getPreviousMonth() {
        let m = getMonthInfo(-1);
        this.setState({
            ...m
        });
        this.props.onMonthChange && this.props.onMonthChange(m.month);
    }

    //Set startingDate to the next week
    getNextMonth() {
        let m = getMonthInfo(1);
        this.setState({
            ...m
        });
        this.props.onMonthChange && this.props.onMonthChange(m.month);
    }

    //Handling press on date/selecting date
    onDateSelected(date) {
        this.setState({selectedDate: date});
        if (this.props.onDateSelected) {
            this.props.onDateSelected(date);
        }
    }

    //Function to check if provided date is the same as selected one, hence date is selected
    //using isSame moment query with 'day' param so that it check years, months and day
    isDateSelected(date) {
        if(!date) return false;
        return date.isSame(this.state.selectedDate, 'day');
    }

    render() {
        let weekIndex = 0;

        this.state.weeks.forEach((week, wIndex) => {
            week.forEach((date) => {
                if(this.state.selectedDate.isSame(date, 'day')){
                    weekIndex = wIndex;
                }
            });
        });

        const weekRender = (week, wIndex) => {
            if(wIndex === 0){
                let pre = null;
                for(let i=6;i>-1;i--){
                    week[i] = week[i] || pre.subtract(1,'days');
                    pre = week[i].clone();
                }
            }
            if(wIndex === this.state.weeks.length - 1){
                let pre = null;
                for(let i=0;i<7;i++){
                    week[i] = week[i] || pre.add(1,'days');
                    pre = week[i].clone();
                }
            }
            return week.map((date, index) => {
                let hasEvent = this.props.events.some((d) => {
                    return d == date.format('YYYYMMDD');
                });

                return (
                    <View key={index} style={[Env.style.fxCenter,{flex:1}]}>
                        <CalendarDay
                            date={date}
                            key={index}
                            isCurrentMonthDate={this.state.month === date.format('YYYYMM')}
                            selected={this.isDateSelected(date)}
                            onDateSelected={this.onDateSelected}
                            calendarColor={this.props.calendarColor}
                            highlightColor={this.props.highlightColor}
                            borderHighlightColor={this.props.borderHighlightColor}
                            event={hasEvent}
                        />
                    </View>
                )
            })
        }
        return (
            <View style={[styles.calendarContainer, {backgroundColor: this.props.calendarColor}, this.props.style]}>
                <View style={[{flexDirection:'row',justifyContent:'center'}]}>
                    <View style={{flex:1}}></View>
                    <View style={{flexDirection:'row',justifyContent:'center',flex:3}}>
                        <TouchableOpacity
                            onPress={this.getPreviousMonth.bind(this)}
                            style={[styles.iconContainer, this.props.iconContainer]} >
                            <Icons.IconArrowLeft/>
                        </TouchableOpacity>
                        <Text style={[styles.calendarHeader, this.props.calendarHeaderStyle]}>{this.state.current.format('YYYY年MM月')}</Text>
                        <TouchableOpacity
                            onPress={this.getNextMonth.bind(this)}
                            style={[styles.iconContainer, this.props.iconContainer]} >
                            <Icons.IconArrowRight/>
                        </TouchableOpacity>
                    </View>
                    <View style={[{flex:1, flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
                        <Text onPress={() => {
                            this.today();
                        }}>今天</Text>
                    </View>
                </View>
                <Swiper ref="swiper" showsButtons={false} loop={false} index={weekIndex}>
                    {this.state.weeks.map((week, index) =>
                        <View style={[styles.calendarDates]} key={index}>
                            {weekRender(week,index)}
                        </View>
                    )}
                </Swiper>

            </View>
        );
    }
}
